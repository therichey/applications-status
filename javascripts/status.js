var statuses = []

$(function(){

  // A row is a row in the spreadsheet, e.g:
  // {
  //   rowNumber: 2,
  //   type: "Price checking",
  //   description: "All fine",
  //   status: "green",
  //   date: "27/07/2015",
  //  
  // }
  var parseRow = function(row) {
        var status = {
          type: row.type,
          description: row.description,
          status: row.status,
          date: row.date
        }

        statuses.push(status)
        
  }

  // A sheet is an array of rows
  var parseSheet = function(sheet) {
    for (var rowNumber in sheet) {
      var row = sheet[rowNumber];
      parseRow(row);
    }
  }

  var parseSpreadsheet = function(spreadsheet, tabletop) {
    var sheet = spreadsheet.Sheet1.all();
    parseSheet(sheet);
    putDataInPage();
  }

  var putDataInPage = function() {
    //Running Handlebars so the JSON retrieved from the Google spreadsheet can be put in the html
    var source = $('#status-template').html();
    var template = Handlebars.compile(source);
    var html = template(statuses);
    $('body').append(html);
    
  }


  Tabletop.init( { key: '10iVL2pfpgz_I66juuNre4PRIeEPlP0ZEMevUa3_OWzM',
                   callback: parseSpreadsheet,
                   simpleSheet: false } )

});
