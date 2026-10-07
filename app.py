from flask import Flask, render_template, request, session, redirect
import mysql.connector
import os
app = Flask(__name__)
app.secret_key = "cadpoint_secret_key"

@app.route("/")
def home():
    return render_template("index.html")

db = mysql.connector.connect(
    host=os.environ["DB_HOST"],
    port=int(os.environ.get("DB_PORT", "12081")),
    user=os.environ["DB_USER"],
    password=os.environ["DB_PASSWORD"],
    database=os.environ["DB_NAME"],
    ssl_disabled=False
)

@app.route("/home-enquiry", methods=["POST"])
def home_enquiry():
    print("FORM DATA:", request.form)
    name = request.form.get("name")
    mobile = request.form.get("mobile")
    email = request.form.get("email")
    qualification = request.form.get("qualification")
    category = request.form.get("category")
    course = request.form.get("course")
    message = request.form.get("message")

    print("NAME:", name)
    print("MOBILE:", mobile)
    print("EMAIL:", email)
    print("CATEGORY:", category)
    print("COURSE:", course)
    print("MESSAGE:", message)

    cursor = db.cursor()

    query = """
    INSERT INTO enquiries
    (name, mobile, email, category, course, message)
    VALUES (%s, %s, %s, %s, %s, %s)
    """

    values = (
        name,
        mobile,
        email,
        category,
        course,
        message
    )

    cursor.execute(query, values)

    db.commit()

    cursor.close()

    return "Thank you! Your enquiry has been submitted successfully."


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/course")
def course():
    return render_template("course.html")

@app.route("/arts-course")
def arts_course():
    return render_template("arts&science.html")
    
@app.route("/engineering")
def engineering():
    return render_template("engineering.html")

@app.route("/faculty")
def faculty():
    return render_template("faculty.html")

@app.route("/contact", methods=["GET", "POST"])
def contact():

    if request.method == "POST":

        name = request.form.get("name")
        mobile = request.form.get("mobile")
        email = request.form.get("email")
        category = request.form.get("category")
        course = request.form.get("course")
        message = request.form.get("message")

        cursor = db.cursor()

        query = """
        INSERT INTO enquiries
        (name, mobile, email, category, course, message)
        VALUES (%s, %s, %s, %s, %s, %s)
        """

        values = (
            name,
            mobile,
            email,
            category,
            course,
            message
        )

        cursor.execute(query, values)

        db.commit()

        cursor.close()

        return "Thank you! Your message has been sent successfully."

    return render_template("contact.html")

@app.route("/admin-dashboard")
def admin_dashboard():

    if not session.get("admin_logged_in"):
        return "Please login as Admin first!"

    return render_template("admin_dashboard.html")

@app.route("/view-enquiries")
def view_enquiries():

    if not session.get("admin_logged_in"):
        return "Please login as Admin first!"

    cursor = db.cursor()

    query = "SELECT * FROM enquiries"

    cursor.execute(query)

    enquiries = cursor.fetchall()

    cursor.close()

    return render_template(
        "view_enquiries.html",
        enquiries=enquiries
    )

@app.route("/logout")
def logout():

    session.pop("admin_logged_in", None)

    return redirect("/login")

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form.get("email")
        password = request.form.get("password")
        login_type = request.form.get("loginType")

        print("EMAIL:", email)
        print("PASSWORD:", password)
        print("LOGIN TYPE:", login_type)

        cursor = db.cursor()

        query = """
        SELECT * FROM users
        WHERE email = %s
        AND password = %s
        AND login_type = %s
        """

        values = (
            email,
            password,
            login_type
        )

        cursor.execute(query, values)

        user = cursor.fetchone()

        cursor.close()

        if user:
            session["admin_logged_in"] = True
            return redirect("/admin-dashboard")

        else:
            session["login_error"] = "Invalid Email or Password!"
            return redirect("/login")

    error = session.pop("login_error", None)
    return render_template("login.html", error=error)
    
if __name__ == "__main__":
    app.run(debug=True)