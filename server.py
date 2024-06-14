from flask import Flask, jsonify, render_template
import pandas as pd

df = pd.read_csv("Dataset.csv")
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# Chart 1--Donut chart:
@app.route('/get-datachart1')
def get_datachart1():
    grouped_data = df.groupby(by='category')['student'].count().reset_index()

    data = []
    for index, row in grouped_data.iterrows():
        data.append({"category": row['category'], "student": int(row['student'])})
    return jsonify(data)


# Chart 2--map chart:
@app.route('/get-datachart2')
def get_datachart2():    
    region = df["region"].value_counts().index
    student = df["region"].value_counts().values
    data2 = []
    for i in range(len(region)):
        data2.append({"region": region[i],"student": int(student[i]),})
    return jsonify(data2)   


# Chart 3--column chart:
@app.route('/get-datachart3')
def get_datachart3():

    df['FirstWord'] = df['University Name'].str.split().str[0]

    grouped_data = df.groupby(by='FirstWord')['Rating'].mean().reset_index()

    data = []
    for index, row in grouped_data.iterrows():
        data.append({"country": row['FirstWord'], "value": int(row['Rating'])})
    return jsonify(data)


# Chart 4--Line chart:
@app.route('/get-datachart4')
def get_datachart4():
    grouped_data = df.groupby(by='Year')['Total Revenue'].sum().reset_index()
    data4 = []
    for index, row in grouped_data.iterrows():
        data4.append({"Year": int(row['Year']), "Total Revenue": float(row['Total Revenue'])})

    return jsonify(data4)


# Chart 5--smart gauge chart:
@app.route('/get-datachart5')
def get_datachart5():
    filtered_data = df[df['GPA'] > 2]
    grouped_data = filtered_data.groupby(by='category').size().reset_index(name='student')
    totalnumber = df["category"].value_counts().values
    data5 = []
    for index, row in grouped_data.iterrows():
        data5.append({"category": row['category'], "student": int(row['student']), "full" : int(totalnumber[index])})

    return jsonify(data5)


if __name__ == '__main__':
    app.run(debug=True)


