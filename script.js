function getinfo(){
    studentname=document.getElementById("studentname").value;
    stna1=document.getElementById("stna1");
    stna1.textContent=studentname;
    
    
    studentId=document.getElementById("studentid").value;
    stid=document.getElementById("stid");
    stid.textContent=studentId;
    
    
    section=document.getElementById("section").value;
    sec=document.getElementById("sec");
    sec.textContent=section;

    
    
    batch=document.getElementById("batch").value;
    batch1=document.getElementById("batch1");
    batch1.textContent=batch;
     
    
    semester1=document.getElementById("semester1").value;
    semester2=document.getElementById("semester2").value;
    sem1=document.getElementById('sem1');
    sem1.textContent=semester1+"-"+semester2;
   
   
    CourseName=document.getElementById("CourseName").value;
    cn=document.getElementById("cn");
    cn.textContent=CourseName;
    
    
    CourseID=document.getElementById("CourseID").value;
    cc=document.getElementById("cc");
    cc.textContent=CourseID;
   
   
    TeacherName=document.getElementById("TeacherName").value;
    ctn=document.getElementById("ctn");
    ctn.textContent=TeacherName;
    
   
   
   
    Designation=document.getElementById("Designation").value;
    de=document.getElementById("de");
    de.textContent=Designation;
    
    
    Date1=document.getElementById("Date").value;
    da=document.getElementById("da");
    da.textContent=Date1;

    covertype=document.getElementById("covertype").value;
    covername=document.getElementById("covername");
    covername.textContent=covertype;

    if(covertype=="Theory Assignment Report"){
        giveinfo(1,2,1,1,5)
    }

     else if(covertype=="Lab Assignment Report"){
        giveinfo(2,4,2,2,10)
    }
    
    else if(covertype=="Lab Report"){
        giveinfo(3,4,8,10,25)
    }
    else if(covertype=="Lab Evaluation Report"){
        giveinfo(3,4,8,10,25)
    }

 

    else if(covertype=="Lab Final"){
        giveinfo(10,15,10,5,40)
    }

 
    





}

 document.getElementById('ftype').addEventListener('change',()=> {
      down3 =document.getElementById("ftype").value;
 if(down3=="pdf"){
  document.getElementById("file1").style.display="block";
  }

  if(down3=="image"){
  document.getElementById("file1").style.display="none";
  }
 
     });

function giveinfo( n1 , n2 , n3 , n4 , n5){
    document.getElementById("n1").textContent=n1;
        document.getElementById("n2").textContent=n2;    
        document.getElementById("n3").textContent=n3;
            document.getElementById("n4").textContent=n4;
                document.getElementById("n5").textContent=n5;
                    

}
function download(){
    
    down =document.getElementById("ftype").value;
    down2=document.getElementById("file");
    s=returnscale();
    q=returnquality();
    if(down=="pdf" && down2.files.length === 0){
       downloadPDF(s,q);
    }
    else if(down=="pdf" &&  down2.files.length !== 0){
        
             PDF1(s,q);
    }
    else if(down=="image"){
        takeScreenshot(s);
    }
}

function returnscale(){
    scale=document.getElementById("rtype").value;
    if(scale=="low"){
        return 1;
    }
    else if(scale=="normal"){
        return 2;
    }

    else if(scale=="high"){
        return 3;
    }
    else{
        return 1;
    }
}

function returnquality(){
    quality=document.getElementById("rtype").value;
    if(quality=="low"){
        return 0.3;
    }
    else if(quality=="normal"){
        return 0.7;
    }

    else if(quality=="high"){
        return 0.9;
    }
    else{
        return 0.5;
    }
}


async function downloadPDF(s,q) {
    const { jsPDF } = window.jspdf;
    const element = document.getElementById('cover-page');

    
    const canvas = await html2canvas(element, { 
        scale: s, 
        useCORS: true, 
        logging: false 
    });
    
    
    const imgData = canvas.toDataURL('image/jpeg', q);

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      
        compress: true 
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    
    const studentId2 = document.getElementById("studentid").value || "Student";

   
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    
    pdf.save(studentId2 + "_Cover_Page.pdf");
}




function takeScreenshot(s) {
    const element = document.getElementById('cover-page');
    studentId1=document.getElementById("studentid").value;
    html2canvas(element, {
        scale: s,           
        useCORS: true,      
        backgroundColor: "#ffffff" 
    }).then(canvas => {
        
        const link = document.createElement('a');
        link.download = studentId1+'_Cover_Page.png'; 
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}





async function PDF1(resScale, quality) {
    const { jsPDF } = window.jspdf;
    const { PDFDocument } = PDFLib; 
    const element = document.getElementById('cover-page');
    const fileInput = document.getElementById("file"); 

    if (!fileInput.files[0]) {
        alert("Please upload the main PDF file first!");
        return;
    }

    
    const canvas = await html2canvas(element, { 
        scale: resScale, 
        useCORS: true,
        logging: false 
    });


    const imgData = canvas.toDataURL('image/jpeg', quality);

    const coverPdf = new jsPDF({ 
        orientation: 'portrait', 
        unit: 'mm', 
        format: 'a4',
        compress: true 
    });

    const pdfWidth = coverPdf.internal.pageSize.getWidth();
    const imgProps = coverPdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    
    coverPdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    
    const coverBytes = coverPdf.output('arraybuffer');

    const uploadedFile = fileInput.files[0];
    const uploadedBytes = await uploadedFile.arrayBuffer();

    const mergedPdf = await PDFDocument.create();
    
    const pdf1 = await PDFDocument.load(coverBytes);
    const pdf2 = await PDFDocument.load(uploadedBytes);

    const coverPages = await mergedPdf.copyPages(pdf1, pdf1.getPageIndices());
    coverPages.forEach((page) => mergedPdf.addPage(page));

    const contentPages = await mergedPdf.copyPages(pdf2, pdf2.getPageIndices());
    contentPages.forEach((page) => mergedPdf.addPage(page));

    const mergedPdfBytes = await mergedPdf.save({ useObjectStreams: true });
    
    const studentId2 = document.getElementById("studentid").value || "Student";
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = studentId2 + ".pdf";
    link.click();
}
