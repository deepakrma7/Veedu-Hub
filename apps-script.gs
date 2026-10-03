// Google Apps Script: receives form posts, saves to a Google Sheet, emails you.
var NOTIFY = "deepak.dhanusu@protonmail.com";
function doPost(e) {
  var p = e.parameter;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName("Leads") || ss.insertSheet("Leads");
  if (sh.getLastRow() === 0) {
    sh.appendRow(["Time", "Full name", "Phone", "Email", "Preferred day", "Project", "Status", "Page"]);
  }
  sh.appendRow([new Date(), p.name, "'" + p.phone, p.email, p.visit_day, p.project, "New", p.page]);
  MailApp.sendEmail(NOTIFY, "New site visit enquiry: " + p.name,
    "Name: " + p.name + "\nPhone: " + p.phone + "\nEmail: " + p.email +
    "\nPreferred day: " + p.visit_day + "\nProject: " + p.project);
  return ContentService.createTextOutput("ok");
}
