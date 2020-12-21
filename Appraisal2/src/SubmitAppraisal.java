import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;





@WebServlet({"/SubmitAppraisal"})
public class SubmitAppraisal
  extends HttpServlet
{
  private static final long serialVersionUID = 1L;
  private static Font pageHeading1 = new Font(Font.FontFamily.TIMES_ROMAN, 16.0F, 1);
  private static Font pageHeading2 = new Font(Font.FontFamily.TIMES_ROMAN, 14.0F, 1);
  private static Font runningText = new Font(Font.FontFamily.TIMES_ROMAN, 12.0F);
  







  private static Font smallBold = new Font(Font.FontFamily.TIMES_ROMAN, 12.0F, 1);
  
  public SubmitAppraisal() {}
  
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String startYear = request.getParameter("startYear");
    String endYear = request.getParameter("endYear");
    String fullName = request.getParameter("fullName");
    String department = request.getParameter("department");
    String designation = request.getParameter("designation");
    



    response.setContentType("application/pdf");
    try
    {
      Document document = new Document();
      document.setPageSize(PageSize.A4);
      

      PdfWriter.getInstance(document, response.getOutputStream());
      document.open();
      addTitlePage(document, startYear, endYear, fullName, department, designation);
      addContent(request, response, document);
      document.close();

    }
    catch (Exception e)
    {
      e.printStackTrace();
    }
  }
  





  private static void addTitlePage(Document document, String startYear, String endYear, String fullName, String department, String designation)
    throws DocumentException
  {
    Rectangle rect = new Rectangle(36.0F, 108.0F);
    rect.enableBorderSide(1);
    rect.enableBorderSide(2);
    rect.enableBorderSide(4);
    rect.enableBorderSide(8);
    rect.setBorder(2);
    rect.setBorderColor(BaseColor.BLACK);
    
    document.add(rect);
    
    Paragraph preface = new Paragraph();
    
    preface.add(new Paragraph("Ramaiah Institute of Technology, Bangalore - 560054", pageHeading1));
    preface.add(new Paragraph("(Autonomous Institute, affiliated to VTU)", pageHeading2));
    
    addEmptyLine(preface, 3);
    
    preface.add(new Paragraph("Annual Appraisal Form for the Year " + startYear + " - " + endYear, smallBold));
    addEmptyLine(preface, 8);
    
    preface.add(new Paragraph("Name: " + fullName, runningText));
    preface.add(new Paragraph("Designation: " + designation, runningText));
    preface.add(new Paragraph("Department: " + department, runningText));
    
    document.add(preface);
    
    document.newPage();
  }
  
  private static void addContent(HttpServletRequest request, HttpServletResponse response, Document document)
    throws DocumentException
  {
    float[] columnWidths = { 1.0F, 4.0F, 5.0F };
    
    PdfPTable table = new PdfPTable(3);
    table.setWidthPercentage(100.0F);
    table.setWidths(columnWidths);
    
    PdfPCell c1 = new PdfPCell(new Phrase("Sl. No.", runningText));
    c1.setHorizontalAlignment(1);
    table.addCell(c1);
    
    c1 = new PdfPCell(new Phrase("Scoring Category", runningText));
    c1.setHorizontalAlignment(1);
    table.addCell(c1);
    
    c1 = new PdfPCell(new Phrase("Number", runningText));
    c1.setHorizontalAlignment(1);
    table.addCell(c1);
    table.setHeaderRows(1);
    
    PdfPCell teachHeading = new PdfPCell(new Phrase("Teaching", runningText));
    teachHeading.setColspan(3);
    teachHeading.setHorizontalAlignment(1);
    table.addCell(teachHeading);
    
    table.addCell(new Phrase("1.", runningText));
    table.addCell(new Phrase("FCI Score (Average of all courses handled)", runningText));
    table.addCell(new Phrase(request.getParameter("fciScore"), runningText));
    
    PdfPCell researchHeading = new PdfPCell(new Phrase("Research", runningText));
    researchHeading.setColspan(3);
    researchHeading.setHorizontalAlignment(1);
    table.addCell(researchHeading);
    
    table.addCell(new Phrase("2.", runningText));
    table.addCell(new Phrase("No. of refereed journal papers in SJR/Scopus/Web of Science\n(The faculty should be one among first 3 authors)", runningText));
    table.addCell(new Phrase(request.getParameter("nirfJournals"), runningText));
    
    table.addCell(new Phrase("3.", runningText));
    table.addCell(new Phrase("No. of indexed conference papers in SJR/Scopus/Web of Science\n(The faculty should be one among first 3 authors)", runningText));
    table.addCell(new Phrase(request.getParameter("indexedPapers"), runningText));
    
    table.addCell(new Phrase("4.", runningText));
    table.addCell(new Phrase("No. of non-refereed journals and non-indexed conferences\n(The faculty should be one among first 3 authors)", runningText));
    table.addCell(new Phrase(request.getParameter("journalPublication"), runningText));
    
    table.addCell(new Phrase("5.", runningText));
    table.addCell(new Phrase("Books/Chapters\n(The faculty should be one among first 3 authors)", runningText));
    
    String books = request.getParameter("books");
    String booksChapters = request.getParameter("booksChapters");
    
    PdfPTable booksTable = new PdfPTable(2);
    

    booksTable.addCell(new Phrase("Books:", runningText));
    booksTable.addCell(books);
    
    booksTable.addCell(new Phrase("Book Chapters:", runningText));
    booksTable.addCell(booksChapters);
    
    PdfPCell booksCell = new PdfPCell(booksTable);
    booksCell.setPadding(0.0F);
    table.addCell(booksCell);
    


    table.addCell(new Phrase("6.", runningText));
    table.addCell(new Phrase("Disclosures Filed", runningText));
    table.addCell(new Phrase(request.getParameter("disclosuresFiled"), runningText));
    
    table.addCell(new Phrase("7.", runningText));
    table.addCell(new Phrase("Patents Granted*", runningText));
    table.addCell(new Phrase(request.getParameter("patentsGranted"), runningText));
    
    table.addCell(new Phrase("8.", runningText));
    table.addCell(new Phrase("Research Guidance Under Graduate Program", runningText));
    table.addCell(new Phrase(request.getParameter("researchGuidanceUg"), runningText));
    
    table.addCell(new Phrase("9.", runningText));
    table.addCell(new Phrase("Research Guidance Master's Program", runningText));
    table.addCell(new Phrase(request.getParameter("researchGuidanceMaster"), runningText));
    
    table.addCell(new Phrase("10.", runningText));
    table.addCell(new Phrase("Research Guidance Ph.D.", runningText));
    table.addCell(new Phrase(request.getParameter("researchGuidancePhd"), runningText));
    
    table.addCell(new Phrase("11.", runningText));
    table.addCell(new Phrase("Funded Projects*", runningText));
    
    String fundedProjects1 = request.getParameter("fundedProjects1");
    String fundedProjects2 = request.getParameter("fundedProjects2");
    String fundedProjects3 = request.getParameter("fundedProjects3");
    String fundedProjects4 = request.getParameter("fundedProjects4");
    
    PdfPTable fundedTable = new PdfPTable(2);
    

    fundedTable.addCell(new Phrase(">= 10 Lakhs:", runningText));
    fundedTable.addCell(fundedProjects1);
    
    fundedTable.addCell(new Phrase(">= 5 Lakhs and < 10 Lakhs:", runningText));
    fundedTable.addCell(fundedProjects2);
    
    fundedTable.addCell(new Phrase(">=1 Lakhs and < 5 Lakhs:", runningText));
    fundedTable.addCell(fundedProjects3);
    
    fundedTable.addCell(new Phrase("<1 Lakhs:", runningText));
    fundedTable.addCell(fundedProjects4);
    
    PdfPCell fundedCell = new PdfPCell(fundedTable);
    fundedCell.setPadding(0.0F);
    table.addCell(fundedCell);
    
    table.addCell(new Phrase("12.", runningText));
    table.addCell(new Phrase("Consulting Projects", runningText));
    
    String consultingProjects1 = request.getParameter("consultingProjects1");
    String consultingProjects2 = request.getParameter("consultingProjects2");
    String consultingProjects3 = request.getParameter("consultingProjects3");
    String consultingProjects4 = request.getParameter("consultingProjects4");
    
    PdfPTable consultingTable = new PdfPTable(2);
    

    consultingTable.addCell(new Phrase(">= 10 Lakhs:", runningText));
    consultingTable.addCell(consultingProjects1);
    
    consultingTable.addCell(new Phrase(">= 5 Lakhs and < 10 Lakhs:", runningText));
    consultingTable.addCell(consultingProjects2);
    
    consultingTable.addCell(new Phrase(">=1 Lakhs and < 5 Lakhs:", runningText));
    consultingTable.addCell(consultingProjects3);
    
    consultingTable.addCell(new Phrase("<1 Lakhs:", runningText));
    consultingTable.addCell(consultingProjects4);
    
    PdfPCell consultingCell = new PdfPCell(consultingTable);
    consultingCell.setPadding(0.0F);
    table.addCell(consultingCell);
    



    PdfPCell serviceHeading = new PdfPCell(new Phrase("Service and Professional Development", runningText));
    serviceHeading.setColspan(3);
    serviceHeading.setHorizontalAlignment(1);
    table.addCell(serviceHeading);
    
    table.addCell(new Phrase("13.", runningText));
    table.addCell(new Phrase("No. of Conference Chair, Session Chair, Reviewer of Q1 or Q2 Journal", runningText));
    table.addCell(new Phrase(request.getParameter("chairReviewer"), runningText));
    
    table.addCell(new Phrase("14.", runningText));
    table.addCell(new Phrase("No. of FDP/ Seminar/ Workshop organized as coordinator", runningText));
    
    String fiveDayWorkShop = request.getParameter("fiveDayWorkShop");
    String threeDayWorkShop = request.getParameter("threeDayWorkShop");
    
    PdfPTable workshopTable = new PdfPTable(2);
    

    workshopTable.addCell(new Phrase("5 days:", runningText));
    workshopTable.addCell(fiveDayWorkShop);
    
    workshopTable.addCell(new Phrase("3 days:", runningText));
    workshopTable.addCell(threeDayWorkShop);
    
    PdfPCell workshopCell = new PdfPCell(workshopTable);
    workshopCell.setPadding(0.0F);
    table.addCell(workshopCell);
    

    table.addCell(new Phrase("15.", runningText));
    table.addCell(new Phrase("No. of invited technical talks outside the institute", runningText));
    table.addCell(new Phrase(request.getParameter("invitedTalksOutside"), runningText));
    
    table.addCell(new Phrase("16.", runningText));
    table.addCell(new Phrase("No. of events participated outside the institute\n(FDP/Seminar/Workshop/Conference)", runningText));
    table.addCell(new Phrase(request.getParameter("eventsOutside"), runningText));
    
    table.addCell(new Phrase("17.", runningText));
    table.addCell(new Phrase(" \tNo. of events participated inside the institute\n(FDP/Seminar/Workshop/Conference) ", runningText));
    table.addCell(new Phrase(request.getParameter("invitedTalksInside"), runningText));
    
    table.addCell(new Phrase("18.", runningText));
    table.addCell(new Phrase("Industry Relations\n(MoU, Co-hosted event, Technical Talk Series)", runningText));
    table.addCell(new Phrase(request.getParameter("industryRelations"), runningText));
    
    table.addCell(new Phrase("19.", runningText));
    table.addCell(new Phrase("Institutional/Departmental Services such as NBA/NIRF", runningText));
    
    PdfPTable instDeptServicesTable = new PdfPTable(2);
    

    String instDeptServicesCoordinator = request.getParameter("instDeptServicesCoordinator");
    String instDeptServicesOthers = request.getParameter("instDeptServicesOthers");
    
    instDeptServicesTable.addCell(new Phrase("Coordinator:", runningText));
    instDeptServicesTable.addCell(instDeptServicesCoordinator);
    
    instDeptServicesTable.addCell(new Phrase("Others:", runningText));
    instDeptServicesTable.addCell(instDeptServicesOthers);
    
    PdfPCell instDeptServicesCell = new PdfPCell(instDeptServicesTable);
    instDeptServicesCell.setPadding(0.0F);
    table.addCell(instDeptServicesCell);
    


    table.addCell(new Phrase("20.", runningText));
    table.addCell(new Phrase("Other Services to the institution or society contribution", runningText));
    table.addCell(new Phrase(request.getParameter("othServices"), runningText));
    
    table.addCell(new Phrase("21.", runningText));
    table.addCell(new Phrase("Awards and Honours", runningText));
    table.addCell(new Phrase(request.getParameter("awardsHonours"), runningText));
    








    table.addCell(new Phrase("22.", runningText));
    table.addCell(new Phrase("Professionalism / Team spirit", runningText));
    table.addCell(new Phrase(request.getParameter("profTeam"), runningText));
    
    table.addCell(new Phrase("23.", runningText));
    
    PdfPCell anyContribution = new PdfPCell(new Phrase("Any other major contributions: (Max 500 characters):\n" + request.getParameter("anyContribution"), runningText));
    anyContribution.setColspan(2);
    table.addCell(anyContribution);
    
    document.add(table);
    

    PdfPTable totalScoreTable = new PdfPTable(2);
    totalScoreTable.setWidthPercentage(100.0F);
    totalScoreTable.setSpacingBefore(20.0F);
    
    totalScoreTable.addCell(new Phrase("Total", runningText));
    totalScoreTable.addCell(new Phrase(request.getParameter("totalScore"), runningText));
    
    totalScoreTable.addCell(new Phrase("Bonus*", runningText));
    totalScoreTable.addCell(new Phrase(request.getParameter("bonusScore"), runningText));
    
    totalScoreTable.addCell(new Phrase("Final Score:", runningText));
    totalScoreTable.addCell(new Phrase(request.getParameter("finalScore"), runningText));
    
    document.add(totalScoreTable);
    
    Paragraph emptyLine = new Paragraph(" ");
    document.add(emptyLine);
    
    Paragraph signatureParagraph = new Paragraph("Signature of the Faculty", runningText);
    



    signatureParagraph.setAlignment(2);
    signatureParagraph.setSpacingBefore(100.0F);
    document.add(signatureParagraph);
    
    document.newPage();
    
    PdfPTable hodRecoTable = new PdfPTable(2);
    hodRecoTable.setWidthPercentage(100.0F);
    hodRecoTable.setSpacingBefore(20.0F);
    
    hodRecoTable.addCell(new Phrase("Comments from HoD:", runningText));
    hodRecoTable.addCell(new Phrase("Recommended/Not Recommended", runningText));
    
    PdfPCell hodComments = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n", runningText));
    hodComments.setColspan(2);
    hodRecoTable.addCell(hodComments);
    
    hodRecoTable.addCell(new Phrase("Date:", runningText));
    hodRecoTable.addCell(new Phrase("Signature", runningText));
    
    document.add(hodRecoTable);
    
    PdfPTable principalRecoTable = new PdfPTable(2);
    principalRecoTable.setWidthPercentage(100.0F);
    principalRecoTable.setSpacingBefore(20.0F);
    
    principalRecoTable.addCell(new Phrase("Comments from Principal:", runningText));
    principalRecoTable.addCell(new Phrase("   ", runningText));
    
    PdfPCell principalComments = new PdfPCell(new Phrase("\n\n\n\n\n\n\n\n\n\n\n", runningText));
    principalComments.setColspan(2);
    principalRecoTable.addCell(principalComments);
    
    principalRecoTable.addCell(new Phrase("Date:", runningText));
    principalRecoTable.addCell(new Phrase("Signature", runningText));
    
    document.add(principalRecoTable);
  }
  
  private static void addEmptyLine(Paragraph paragraph, int number)
  {
    for (int i = 0; i < number; i++) {
      paragraph.add(new Paragraph(" "));
    }
  }
  
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    doGet(request, response);
  }
}
