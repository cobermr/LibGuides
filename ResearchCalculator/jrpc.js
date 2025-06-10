//! jrpc.js
//! authors : John Meyerhofer

//Step Values - The decimal point describes the amount of time each step should take. Make sure that the total of your numbers equal 1 (one)
//or in other words make sure it equals 100% of the time.
var StepTimes = [.08,.07,.2,.25,.05,.2,.1,.05];
var numSteps = StepTimes.length;

var StepTitles = [
    "Step 1 - Understand your assignment and select a topic.",
    "Step 2 - Draft your thesis or research question.",
    "Step 3 - Find and evaluate evidence and sources.",
    "Step 4 - Critically read and evaluate sources.",
    "Step 5 - Outline or describe overall structure.",
    "Step 6 - Write first draft.",
    "Step 7 - Revise and rewrite with a focus on content. Conduct additional research as necessary.",
    "Step 8 - Polish and put assignment in final form."
];

//Remember that the array is 0 based. So 0 is actually step 1, 1 is step 2 and so on...
//in order to use the " character within a body's string, use the \ character before it.
var StepBody = [];
StepBody[0] = "<ul><li>Read through and understand your assignment.</li>" +
      "<li>Email your instructor or visit their office hours if you have questions.</li>" +
      "<li>Learn about Choosing and refining research topics</li>" +
      "<li>Conduct preliminary investigation into your topic. Aim for an overview of its vocabulary, key concepts, and important issues." +
      "<ul><li>You can use Google or other web searches</li>" +
      "<li>Try searching encyclopedias</li>" +
      "<li>Get background on current topics using library tools like Opposing Viewpoints or Issues & Controversies</li>" +
      "<li>Write down important terms and concepts related to your topic to use as keywords or search terms when you start searching for sources.</li>" +
      "</ul></li></ul>";

StepBody[1] = "<ol><li><h4>Understand the assignment. What are you being asked to do?</h4></li>" +
      "<li><h4>Do you need a better understanding of background or other contextual information?</h4>" +
        "<ul><li>Try encyclopedias (print or <a href=\"http://google.com\" target=\"_blank\">online</a>), dictionaries (print or <a href=\"http://google.com\" target=\"_blank\">online</a>)." +
        "</li></ul></li>" +
      "<li><h4>Consider who creates or has the kind of information you want. This can guide you on where and how to do your searching.</h4></li>" +
      "<li><h4>Identify types of sources needed:</h4>" +
        "<ul><li>Criticism, data, academic journals, trade journals, popular magazines, interviews, web sites, newspapers, government reports/documents, books, measures, empirical research.</li></ul></li>" +
      "<li><h4>Do you need <a href=\"http://www.lib.vt.edu/help/research/primary-secondary-tertiary.html\" target=\"_blank\">primary sources or secondary sources</a>?</h4></li>" +
      "<li><h4>Should you be using peer-reviewed sources?</h4>" +
        "<ul><li>Peer reviewed journals have their content reviewed by experts in the field of study.</li></ul></li>" +
      "<li><h4><a href=\"http://google.com\" target=\"_blank\">Consult with your librarian</a>.</h4></li>" +
    "</ol>";
    
StepBody[2] = "<ol><li><h4>Find Books</h4>" +
      "<ul><li><a href=\"http://www.worldcat.org\">Worldcat</a>. Search box on library home page. Try the <a href=\"http://www.worldcat.org\">WorldCat Tutorial</a>.</li></ul></li>" +
      "<li><h4>Find Articles</h4>" +
        "<ul><li><a href=\"http://www.worldcat.org\">Library Research Databases</a>. Library research databases can be used to find articles in journals, magazines, and newspapers." +
      "</li>" +
    "<li><a href=\"http://scholar.google.com/\">Google Scholar</a>. Google Scholar is a search tool that identifies scholarly research materials. Google Scholar can be used to identify some of the articles available in journals that we might have. Remember, though, just searching Google Scholar will not give you the full picture of the resources available on your topic." +
     "</li>" +
    "<li><a href=\"http://www.worldcat.org\">Library Subject and Course Guides</a>. Guides created by your subject librarian for your field of study. These guides highlight the most important research databases for the subject as well as important reference sources, citation and plagiarism information." +
     "</li></ul></li>" +
     "</ol>" +
      "<p>Different sources may be collected, indexed, and made available in many different ways. Understanding the differences between databases, search engines, catalogs, and other tools for finding sources will help you locate the most efficient resources for your needs. You will likely use several of these different resources for your research." +
     "</p>";

StepBody[3] = "<ol><li><h4><a href=\"http://www.worldcat.org\">Talk to your librarian</a>.</h4>" +
     "<ul><li>Librarians can offer suggestions on where to get started on your research. Request an in-person consultation from the <a href=\"http://www.worldcat.org\">AskUs page</a>." +
     "</li></ul>" +
        "</li>" +
      "<li><h4><a href=\"http://www.worldcat.org\">Check out our Guide to Data Resources</a></h4></li>" +
      "<li><h4>Citation Management - Keep track of sources using citation management tool:</h4>" +
        "<ul><li><a href=\"http://www.worldcat.org\">RefWorks</a></li>" +
         "<li><a href=\"https://www.zotero.org/\">Zotero</a></li>" +
         "<li>Citation management tools allow a user to organize and retrieve information, such as citations for books, articles, and other resources while interfacing with library databases. The citation manager then works with word-processing software to insert properly formatted footnotes or citations into a paper and create a properly formatted bibliography." +
     "</li>" +
         "</ul></li>" +
      "</ol><p>You need to know how to efficiently use databases, search engines and other tools. We provide tips for some of the most-used resources, but always look for “Help” within the database or search engine. Keep track of your search strategies and successes within each resource. Consider using a citation management program that helps you collect and organize sources, such as Zotero." +
     "</p>";

StepBody[4] = "<ol><li><h4>Know Your Stuff! <img src=\"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png\" border=\"1\" /></h4>" +
        "<ul><li>To learn more: <a href=\"http://www.worldcat.org\" target=\"_blank\">Check out the Tutorial</a>" +
        "</li>" +
        "<li>Click to find out if we have the article/book you are need.</li>" +
        "<li>Link you to fulltext (when available);  Link you to WorldCat to help you create an interlibrary loan request for articles/books; and save citations directly to RefWorks.</li></ul></li>" +
      "<li><h4><a href=\"https://www.google.com/\" target=\"_blank\">Journal Search</a></h4>" +
        "<ul><li>Use to find out if the journal issue containing an article you want.</li></ul></li>" +
      "<li><h4><a href=\"https://www.google.com/\" target=\"_blank\">WorldCat</a></h4>" +
        "<ul><li>Use to find out if the item (book, journal, DVD, etc.) you want.</li>" +
        "<li><a href=\"hhttps://www.google.com/\" target=\"_blank\">Check out our WorldCat Tutorial</a></li></ul></li>" +
      "<li><h4><a href=\"https://www.google.com/\" target=\"_blank\">Interlibrary Loan Requests</a></h4>" +
        "<ul><li>Get materials from other libraries. ILLIAD requests usually arrive within a week, but may take longer.</li>" +
        "<li><b>REQUEST</b>:  Note: You cannot request e-books or articles through this Request process</li>" +
        "<li><b>INTERLIBRARY LOAN</b>: Obtain books not available here, articles not available here, and other materials not available. Use \"Request items through interlibrary loan\" button in WorldCat, or the interlibrary loan option, or <a href=\"https://www.google.com/\" target=\"_blank\">login directly to Illiad</a> (use your username and password to login).</li></ul></li>" +
    "</ol>" +
    "<p>Getting materials can be a challenging part of research: you know what you want but not how to get it.  Be sure to check with a librarian for help with this.  Some sources are fully available online, either freely or through a subscription that we pay for.  Many more sources are available only in print (books, journals) or can be obtained for you through interlibrary loan. WorldCat and the Journal Search will help you determine which sources are available, but don’t give up if it seems the source isn’t here. The library is here to  help!</p>";
    
StepBody[5] = "<ol><li><h4><a href=\"http://www.worldcat.org\" target=\"_blank\">Manage Citations/Sources</a></h4>" +
        "<ul><li><a href=\"http://www.worldcat.org\" target=\"_blank\">Refworks</a></li>" +
        "<li><a href=\"http://www.zotero.org/\" target=\"_blank\">Zotero</a></li></ul></li>" +
      "<li><h4>Avoid plagiarism</h4>" +
        "<ul><li><a href=\"http://www.worldcat.org\" target=\"_blank\">Review this plagiarism tutorial</a>.</li>" +
        "<li>Check out <a href=\"http://owl.english.purdue.edu/owl/resource/589/02/\" target=\"_blank\">this Purdue University plagiarism guide</a>.</li></ul></li>" +
    "</ol>" +
    "<p>You will critically evaluate every source you look at to determine its credibility and usefulness. (Remember that you may need to evaluate and incorporate information that contradicts your position or research question.) Your research question may change as you as you discover more information. You should continue to question what you have found and what you are still missing.  Organizing and managing your sources and references helps you to organize your projects and avoid unintentional plagiarism.</p>";
    
StepBody[6] = "<ol><li><h4><a href=\"http://www.worldcat.org\">Center</a> - Writing resources from our center.</h4></li>" +
    "<li><h4><a href=\"http://www.worldcat.org\">Write Well!</a> - A series of Microlectures (1 minute each) on writing." +
    "</h4></li>" +
    "<li><h4>Seriously, talk to your professor</h4></li>" +
    "<li><h4>Revise, revise, revise, revise, revise, revise, and then revise.</h4></li>" +
    "<li><h4>Citing properly - check out: <a href=\"https://www.google.com/\">Center hand-outs</a>, <a href=\"https://www.google.com/\">Library Citing and Writing Resources Guide</a>" +
    "</h4></li>" +
    "</ol>" +
    "<p>Good writing is a must for all your projects, including oral presentations and Power Point slides. You will also need to use proper citation styles for the sources you have found in your research. Your Professor may require a certain “style” (e.g. MLA, APA, Chicago, etc.) or they may ask you to pick one and stick to it." +
    "</p>";

StepBody[7] = "<ol><li><h4>Poster</h4>" +
      "<ul><li>Media Services provides poster printing</li>" +
        "<li><a href=\"https://www.google.com/\" target=\"_blank\">Humanities Resource Center</a> provides Poster Printer PowerPoint Templates</li></ul>" +
      "</li>" +
      "<li><h4>Oral presentation</h4>" +
        "<ul><li><a href=\"https://www.google.com/\" target=\"_blank\">Library Practice Presentation Room</a> - Space set up for you to rehearse your presentation.  Data projector available for checkout as well.</li></ul></li>" +
      "<li><h4>Multimedia presentation</h4>" +
        "<ul><li><a href=\"https://www.google.com/\" target=\"_blank\">Library Multi-media Production Room</a></li>" +
        "<li><a href=\"https://www.google.com/\" target=\"_blank\">Humanities Resources Center</a></li></ul>" +
      "</li>" +
      "<li><h4>Podcast</h4>" +
        "<ul><li><a href=\"https://www.google.com/\" target=\"_blank\">Library Multi-media Production Room</a></li>" +
        "<li><a href=\"https://www.google.com/\" target=\"_blank\">Humanities Resources Center</a></li></ul></li>" +
      "<li><h4>Research Paper</h4>" +
        "<ul><li><a href=\"https://www.google.com/\" target=\"_blank\">Library</a></li>" +
        "<li><a href=\"https://www.google.com/\" target=\"_blank\">Writing Center</a></li>" +
        "<li><a href=\"https://www.google.com/\" target=\"_blank\">Write Well Videos</a></li></ul>" +
        "</li>" +
      "<li><h4>Consider issues such as</h4>" +
        "<ul><li><a href=\"https://www.google.com/\" target=\"_blank\">Copyright</a></li>" +
        "<li><a href=\"https://www.google.com/\" target=\"_blank\">Fair Use</a></li>" +
        "<li><a href=\"https://www.google.com/\" target=\"_blank\">Publishing</a>. Talk to your professor or a librarian if you have any questions.</li></ul></li>" +
      "</ol>" +
      "<p>There are many resources available to help you with the final project of your research, whether that is a paper, a poster session, an oral presentation, a web site, or just about anything else.</p>";
        
function showPanels(){
  for (i = 1; i <= StepTimes.length; i++) { 
    var PanelName = "step" + i + "Panel";
    document.getElementById(PanelName).style.display="block";
      
    //hide the default text
    document.getElementById("disclaimerStatement").style.display="none";
  }
}

function hidePanels(){
  for (i = 1; i <= StepTimes.length; i++) { 
    var PanelName = "step" + i + "Panel";
    console.log('PanelName: ' + PanelName);
    document.getElementById(PanelName).style.display="none";
  }
  //show the default text    
  document.getElementById("disclaimerStatement").style.display="inline";
}


function clearData(){
  document.getElementById("startDate").value="";
  document.getElementById("endDate").value="";
  document.getElementById("daysBetweenStatement").innerHTML="";
  
  hidePanels();  
  
  return false;
}

function saveData(){
    var startDateMoment = moment(document.getElementById("startDate").value, "MM/DD/YYYY");
    console.log('startDateMoment: ' + startDateMoment);
    var endDateMoment = moment(document.getElementById("endDate").value, "MM/DD/YYYY");
    console.log('endDateMoment: ' + endDateMoment);
	
	startTime = startDateMoment;
    endTime = endDateMoment + 43200000;
    timeDiff = endTime - startTime;
    daysBetween = Math.floor(timeDiff/86400000);
    
    console.log('daysBetween: ' + daysBetween);
    
    //don't show the steps! (bad date range)
    if(daysBetween <= 0 || isNaN(daysBetween)) {
      document.getElementById("daysBetweenStatement").innerHTML= "<br/><b>Please enter a valid date range.</b>\n";
      
      hidePanels();
    }   
    
    //show the steps! (show the step divs)
    if(daysBetween > 0) {
      document.getElementById("daysBetweenStatement").innerHTML= "<p><strong>Notes:</strong></p><ul><li>You have <strong>" + daysBetween + "</strong> days to complete your project.</li><li>The research and writing process is not always linear. Keep in mind that you may need to go forward or backward one or more steps at any point in the process.</li></ul>";
       
        var workingTime = startTime;
        for (i = 1; i <= StepTimes.length; i++) {
          //set the title
          var divStepTitle = "stepTitle" + i;
          document.getElementById(divStepTitle).innerHTML = StepTitles[i-1];
          
          //set the body
          var divStepBody = "stepBody" + i;
          document.getElementById(divStepBody).innerHTML = StepBody[i-1];
           
          var dateDuration = StepTimes[i-1] * daysBetween;
          
          //convert to time
          var timeDuration = dateDuration * 86400000
          
          //add duration to original date
          //new date becomes working date
          workingTime = workingTime + timeDuration
        
          //convert workingtime to a date
          var readableDate = new Date(workingTime);
          var divStepName = "step" + i + "date";
          
          if (i == numSteps) {
            //set the last step equal to the last date they entered
            document.getElementById(divStepName).innerHTML = "By " + moment(endDateMoment).format("MMMM Do YYYY");
          } else {
            document.getElementById(divStepName).innerHTML = "By " + moment(readableDate).format("MMMM Do YYYY");
          }
        }
         
      //show the step panels
      showPanels();
        
    }
    return false; // this will stop default submit of form (because by default form submit on "action" url if no action is define than on same page )
}