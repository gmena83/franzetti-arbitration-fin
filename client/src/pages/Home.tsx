const education = [
    {
        degree: "LL.M., International Studies, Distinction and Dean's List, Georgetown University Law Center, Washington D.C. (2008)",
        note: ""
    },
    {
        degree: "Postgraduate Specialization in Business and Economics Law, Getúlio Vargas Foundation, São Paulo, Brazil (2006)",
        note: ""
    },
    {
        degree: "LL.B. (J.D. Equivalent), University of São Paulo Law School, São Paulo, Brazil (2000)",
        note: ""
    }
];

// Rendering section - displaying education
const renderEducation = () => {
    return education.map((item, index) => (
        <div key={index}>
            <h3>{item.degree}</h3>
        </div>
    ));
};

export default renderEducation;