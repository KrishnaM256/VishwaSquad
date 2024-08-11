import React from 'react';
import { Helmet } from 'react-helmet'; 
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
        <>
            <Helmet>
                <title>Certificate of Achievement - SAHAYA</title>
                <meta name="description" content={`Certificate of Achievement for ${name} with a score of ${score}/${total}.`} />
                <meta property="og:title" content="Certificate of Achievement - SAHAYA" />
                <meta property="og:description" content={`Certificate of Achievement for ${name} with a score of ${score}/${total}.`} />
                <meta property="og:image" content="URL_TO_CERTIFICATE_IMAGE" /> {/* Replace with an actual URL if available */}
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="website" />
            </Helmet>
            <div className="certificate-container">
                <div id="certificate" className="certificate">
                    <h1>Certificate of Achievement</h1>
                    <p>This certifies that</p>
                    <h2>{name}</h2>
                    <p>has successfully passed the disaster management quiz with a score of</p>
                    <h3>{score} / {total}</h3>
                    <p>Congratulations on your achievement!</p>
                    <footer>
                        <p>Issued by SAHAYA</p>
                    </footer>
                </div>
                <button onClick={generatePDF} className="download-button">Download Certificate</button>
            </div>
        </>
    );
};

export default Certificate;
