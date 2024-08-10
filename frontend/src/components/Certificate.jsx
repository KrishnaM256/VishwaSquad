import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Certificate = ({ name, score, total }) => {
    const generatePDF = () => {
        const certificate = document.getElementById('certificate');

        html2canvas(certificate).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10);
            pdf.save("certificate.pdf");
        });
    };

    return (
        <div>
            <div id="certificate" style={{ padding: '20px', border: '1px solid #ccc', textAlign: 'center' }}>
                <h1>Certificate of Achievement</h1>
                <p>This certifies that</p>
                <h2>{name}</h2>
                <p>has successfully passed the disaster management quiz with a score of</p>
                <h3>{score} / {total}</h3>
                <p>Congratulations on your achievement!</p>
            </div>
            <button onClick={generatePDF}>Download Certificate</button>
        </div>
    );
};

export default Certificate;
