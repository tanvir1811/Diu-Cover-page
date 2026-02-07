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

function giveinfo( n1 , n2 , n3 , n4 , n5){
    document.getElementById("n1").textContent=n1;
        document.getElementById("n2").textContent=n2;    
        document.getElementById("n3").textContent=n3;
            document.getElementById("n4").textContent=n4;
                document.getElementById("n5").textContent=n5;
                    

}
function download(){
    down =document.getElementById("ftype").value;
    if(down=="pdf"){
       downloadPDF();
    }
    else if(down=="image"){
        takeScreenshot();
    }
}

async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const element = document.getElementById('cover-page');

  
    const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, 
        logging: false 
    });
    
    const imgData = canvas.toDataURL('image/png');


    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    studentId2=document.getElementById("studentid").value;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(studentId2+"_Cover_Page.pdf");
}

function takeScreenshot() {
    const element = document.getElementById('cover-page');
    studentId1=document.getElementById("studentid").value;
    html2canvas(element, {
        scale: 2,           
        useCORS: true,      
        backgroundColor: "#ffffff" 
    }).then(canvas => {
        
        const link = document.createElement('a');
        link.download = studentId1+'_Cover_Page.png'; 
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}