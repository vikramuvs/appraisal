$(document).ready(function () {

    var isAsst = 0,
        isAssoc = 0,
        isProf = 0,
        isHead = 0;
    var Max_Teaching_Score = 60,
        Max_Research_Score = 10,
        Max_Service_Score = 30;
    var Teaching_Score = 0,
        resScore = 0,
        serScore = 0;
    var totalScore =0,
        bonusScore = 0;
        finalScore = 0;
    // $("#totalScore").val(Max_Teaching_Score);
    updateDesig();

    $("#designation").change(function () {  
        updateDesig();
    });

    $("#fciScore").change(function () {
        updateScore(1);
    });

    $("#nirfJournals").change(function () {
        updateScore(2);
    });

    $("#indexedPapers").change(function () {
        updateScore(3);
    });

    $("#journalPublication").change(function () {
        updateScore(12);
    });

    $("#books").change(function () {
        updateScore(13);
    });

    $("#booksChapters").change(function () {
        updateScore(1);
    });

    $("#disclosuresFiled").change(function () {
        updateScore(2);
    });

    $("#patentsGranted").change(function () {
        updateScore(3);
    });

    $("#researchGuidanceUg").change(function () {
        updateScore(3);
    });

    $("#researchGuidanceMaster").change(function () {
        updateScore(12);
    });

    $("#researchGuidancePhd").change(function () {
        updateScore(13);
    });

    $("#fundedProjects1").change(function () {
        updateScore(1);
    });

    $("#fundedProjects2").change(function () {
        updateScore(2);
    });

    $("#fundedProjects3").change(function () {
        updateScore(3);
    });

    $("#fundedProjects4").change(function () {
        updateScore(12);
    });

    $("#consultingProjects1").change(function () {
        updateScore(13);
    });

    $("#consultingProjects2").change(function () {
        updateScore(1);
    });

    $("#consultingProjects3").change(function () {
        updateScore(2);
    });

    $("#consultingProjects4").change(function () {
        updateScore(3);
    });

    $("#chairReviewer").change(function () {
        updateScore(12);
    });

    $("#fiveDayWorkShop").change(function () {
        updateScore(13);
    });

    $("#threeDayWorkShop").change(function () {
        updateScore(14);
    });

    $("#invitedTalksOutside").change(function () {
        updateScore(15);
    });


    $("#eventsOutside").change(function () {
        updateScore(12);
    });

    $("#invitedTalksInside").change(function () {
        updateScore(13);
    });

    $("#industryRelations").change(function () {
        updateScore(15);
    });

    $("#instDeptServicesCoordinator").change(function () {
        updateScore(12);
    });

    $("#instDeptServicesOthers").change(function () {
        updateScore(13);
    });

    $("#othServices").change(function () {
        updateScore(14);
    });

    $("#awardsHonours").change(function () {
        updateScore(15);
    });

    $("#profTeam").change(function () {
        updateScore(15);
    });

    function updateDesig() {
        if ($("#designation").val().search("Assistant") > -1) {
            isAsst = 1;
            isAssoc = 0;
            isProf = 0;
            isHead = 0;
        } else if ($("#designation").val().search("Associate") > -1) {
            isAsst = 0;
            isAssoc = 1;
            isProf = 0;
            isHead = 0;
        } else if (($("#designation").val().search("Professor") > -1) && ($("#designation").val().search("Head") == -1)) {
            isAsst = 0;
            isAssoc = 0;
            isProf = 1;
            isHead = 0;
        } else if ($("#designation").val().search("Head") > -1) {
            isAsst = 0;
            isAssoc = 0;
            isProf = 0;
            isHead = 1;
        }

        if (isAsst == 1) {
            Max_Teaching_Score = 60;
            Max_Research_Score = 10;
            Max_Service_Score = 30;
        } else if (isAssoc == 1) {
            Max_Teaching_Score = 50;
            Max_Research_Score = 20;
            Max_Service_Score = 30;
        } else if (isProf == 1) {
            Max_Teaching_Score = 40;
            Max_Research_Score = 30;
            Max_Service_Score = 30;
        } else if (isHead == 1) {
            Max_Teaching_Score = 40;
            Max_Research_Score = 30;
            Max_Service_Score = 30;
        }
        updateScore(1);
    }
    
    function bonusFinder(score2, score7, score11, score12) {
        if (score2 > 0 || score7 > 0 || score11 > 0 || score12 > 0) {
            resScore = resScore + score2 + score7 + score11 + score12 + 0;
            if (resScore >= Max_Research_Score) {
                bonusScore = parseFloat((resScore - Max_Research_Score).toFixed(1));
                resScore = Max_Research_Score;
            }
            else {
                bonusScore = 0;
            }
        }
        else {
            bonusScore = 0;
        }
    }

    function bonusS (researchScore, _bonusScore) {
        if ((researchScore + _bonusScore) <= Max_Research_Score) { 
            resScore = parseFloat((researchScore + _bonusScore).toFixed(1));
            bonusScore = 0;
        }
        if (researchScore >= Max_Research_Score) { 
            resScore = Max_Research_Score;
        }
        if ((researchScore + _bonusScore) > Max_Research_Score) { 
            resScore =  parseFloat((researchScore + (Max_Research_Score - researchScore)).toFixed(1));
            bonusScore =  parseFloat((bonusScore - (Max_Research_Score - researchScore)).toFixed(1));
        }
    }

    function updateScore(slNo) {
        var bonusScoreFrom2 = 0,
            bonusScoreFrom7 = 0,
            bonusScoreFrom11 = 0,
            bonusScoreFrom12 = 0;
        var score1 = 0,
            score2 = 0,
            score3 = 0,
            score4 = 0,
            score5 = 0,
            score6 = 0,
            score7 = 0,
            score8 = 0,
            score9 = 0,
            score10 = 0,
            score11 = 0,
            score12 = 0,
            score13 = 0,
            score14 = 0,
            score15 = 0,
            score16 = 0,
            score17 = 0,
            score18 = 0,
            score19 = 0,
            score20 = 0,
            score21 = 0,
            score22 = 0;

        var FCI = $("#fciScore").val();

        var refJournal = $("#nirfJournals").val();
        var indexedPapers = $("#indexedPapers").val();
        var journalPublications = $("#journalPublication").val();
        var books = $("#books").val();
        var booksChapters = $("#booksChapters").val();
        var disclosuresFiled = $("#disclosuresFiled").val();
        var patentsGranted = $("#patentsGranted").val();
        var researchGuidanceUg = $("#researchGuidanceUg").val();
        var researchGuidanceMaster = $("#researchGuidanceMaster").val();
        var researchGuidancePhd = $("#researchGuidancePhd").val();
        var fundedProjects1 = $("#fundedProjects1").val();
        var fundedProjects2 = $("#fundedProjects2").val();
        var fundedProjects3 = $("#fundedProjects3").val();
        var fundedProjects4 = $("#fundedProjects4").val();
        var consultingProjects1 = $("#consultingProjects1").val();
        var consultingProjects2 = $("#consultingProjects2").val();
        var consultingProjects3 = $("#consultingProjects3").val();
        var consultingProjects4 = $("#consultingProjects4").val();

        var chairReview = $("#chairReviewer").val();
        var fiveDayWorkShop = $("#fiveDayWorkShop").val();
        var threeDayWorkShop = $("#threeDayWorkShop").val();
        var invitedTalksOutside = $("#invitedTalksOutside").val();
        var eventsOutside = $("#eventsOutside").val();
        var invitedTalksInside = $("#invitedTalksInside").val();
        var industryRelations = $("#industryRelations").val();
        var instDeptServicesCoordinator = $("#instDeptServicesCoordinator").val();
        var instDeptServicesOthers = $("#instDeptServicesOthers").val();
        var othServices = $("#othServices").val();
        var awardsHonours = $("#awardsHonours").val();
        var profTeam = $("#profTeam").val();

        if (FCI == 0) {
            score1 = 0;
        } else {
        if (FCI >= 85) {
            score1 = 1 * Max_Teaching_Score;
        } else if (FCI >= 80 && FCI < 85) {
            score1 = 0.9 * Max_Teaching_Score;
        } else if (FCI >= 75 && FCI < 80) {
            score1 = 0.8 * Max_Teaching_Score;
        } else if (FCI >= 70 && FCI < 75) {
            score1 = 0.7 * Max_Teaching_Score;
        } else if (FCI < 70 && FCI >= 0) {
            score1 = 0.4 * Max_Teaching_Score;
        }
            }

        if (refJournal > 0) {
            score2 = Max_Research_Score * refJournal;
            // if (refJournal > 1) {
            //  bonusScoreFrom2 = (Max_Research_Score * refJournal) - Max_Research_Score;
            // }
        } else {
            score2 = 0;
        }

        if (indexedPapers > 0) {
            if (isAsst == 1) {
                if (indexedPapers == 1) {
                    score3 = Max_Research_Score / 2;
                } else if (indexedPapers >= 2) {
                    score3 = Max_Research_Score;
                } 
            } else if (isAssoc == 1) {
                if (indexedPapers == 1) {
                    score3 = Max_Research_Score * 0.25;
                } else if (indexedPapers == 2) {
                    score3 = Max_Research_Score * 0.5;
                } else if (indexedPapers == 3) {
                    score3 = Max_Research_Score * 0.75;
                } else if (indexedPapers >= 4) {
                    score3 = Max_Research_Score;
                }
            } else if (isProf == 1 || isHead == 1) {
                if (indexedPapers == 1) {
                    score3 = Max_Research_Score * 0.2;
                } else if (indexedPapers == 2) {
                    score3 = Max_Research_Score * 0.4;
                } else if (indexedPapers == 3) {
                    score3 = Max_Research_Score * 0.6;
                } else if (indexedPapers == 4) {
                    score3 = Max_Research_Score * 0.8;
                } else if (indexedPapers >= 5) {
                    score3 = Max_Research_Score;
                }
            }
        } else {
            score3 = 0;
        }

        if (journalPublications > 0) {
            score4 = Max_Research_Score * 0.1;
        } else {
            score4 = 0;
        }

        if (books > 0 || booksChapters > 0) {
            if (books == 0) {
                if (booksChapters >= 1 && booksChapters <= 5) {
                    score5 = Max_Research_Score * 0.2 * booksChapters;
                } else if (booksChapters > 5) {
                    score5 = Max_Research_Score;
                }
            } else if (booksChapters == 0) {
                if (books >= 1 && books <= 2) {
                    score5 = Max_Research_Score * 0.5 * books;
                } else if (books > 2) {
                    score5 = Max_Research_Score;
                }
            } else {
                var bookScore = (books <= 2) ? (0.5 * Max_Research_Score * books) : Max_Research_Score;
                var bookChapScore = (booksChapters <= 5) ? (0.2 * Max_Research_Score * booksChapters) : Max_Research_Score;
                score5 = ((parseInt(bookScore) + parseInt(bookChapScore)) <= Max_Research_Score) ? (parseInt(bookScore) + parseInt(bookChapScore)) : Max_Research_Score;
            }
        } else {
            score5 = 0;
        }

        if (disclosuresFiled > 0) {
            if (disclosuresFiled <= 10) {
                score6 = Max_Research_Score * 0.1 * disclosuresFiled;
            } else if (disclosuresFiled > 10) {
                score6 = Max_Research_Score;
            }
        } else {
            score6 = 0;
        }


        if (patentsGranted > 0) {
            // if (patentsGranted <= 2) {
                score7 = Max_Research_Score * 0.5 * patentsGranted;
            // }
            // if (patentsGranted > 2) {
            //  score7 = Max_Research_Score;
            //  bonusScoreFrom7 = (Max_Research_Score * 0.5 * patentsGranted) - score7;
            // }
        } else {
            score7 = 0;
        }

        if (researchGuidanceUg > 0) {
            // if (researchGuidanceUg < 100) {
                score8 = parseFloat((0.01 * Max_Research_Score * researchGuidanceUg).toFixed(2));
            // }
            // if (researchGuidanceUg >= 100) {
            if (score8 > Max_Research_Score) {
                score8 = Max_Research_Score;
            }
        } else {
            score8 = 0;
        }

        if (researchGuidanceMaster > 0) {
            // if (researchGuidanceMaster <= 33) {
                score9 = parseFloat((0.03 * Max_Research_Score * researchGuidanceMaster).toFixed(2));
            //}
            // if (researchGuidanceMaster > 33) {
            if (score9 > Max_Research_Score) {
                score9 = Max_Research_Score;
            }
        } else {
            score9 = 0;
        }

        if (researchGuidancePhd > 0) {
            // if (researchGuidancePhd <= 14) {
                score10 = parseFloat((0.07 * Max_Research_Score * researchGuidancePhd).toFixed(2));
            //}
            // if (researchGuidancePhd > 14) {
            if (score10 > Max_Research_Score) {
                score10 = Max_Research_Score;
            }
        } else {
            score10 = 0;
        }

        // if (fundedProjects1 > 0 || fundedProjects2 > 0 || fundedProjects3 > 0 || fundedProjects4 > 0) {

        //  var funded1Score = (fundedProjects1 != 0) ? ((fundedProjects1 >= 1) ? fundedProjects1 * Max_Research_Score : 0) : 0;
        //  var funded2Score = (fundedProjects2 != 0) ? ((fundedProjects2 >= 2) ? (0.5 * Max_Research_Score * fundedProjects2) : (0.5 * Max_Research_Score * fundedProjects2)) : 0;
        //  var funded3Score = (fundedProjects3 != 0) ? ((fundedProjects3 >= 3.33) ? (0.3 * Max_Research_Score * fundedProjects3) : (0.3 * Max_Research_Score * fundedProjects3)) : 0;
        //  var funded4Score = (fundedProjects4 != 0) ? ((fundedProjects4 >= 5) ? (0.2 * Max_Research_Score * fundedProjects4) : (0.2 * Max_Research_Score * fundedProjects4)) : 0;

        //  score11 = parseInt(funded1Score) + parseInt(funded2Score) + parseInt(funded3Score) + parseInt(funded4Score) + 0;
        //  /*score11 = parseInt(funded1Score) + parseInt(funded2Score);*/

        //  if (score11 > Max_Research_Score) {
        //      score11 = Max_Research_Score;
        //      bonusScoreFrom11 = fundedBonusCalculator(fundedProjects1, fundedProjects2, fundedProjects3, fundedProjects4);
        //  }
        // } else {
        //  score11 = 0;
        // }
        
        if (fundedProjects1 > 0 || fundedProjects2 > 0 || fundedProjects3 > 0 || fundedProjects4 > 0) {

        var funded1Score = fundedProjects1 * Max_Research_Score * 1;
        var funded2Score = fundedProjects2 * Max_Research_Score * 0.5;
        var funded3Score = fundedProjects3 * Max_Research_Score * 0.3;
        var funded4Score = fundedProjects4 * Max_Research_Score * 0.2;
        
        // console.log("F1 " + funded1Score);
        // console.log("F2 " + funded2Score);
        // console.log("F3 " + funded3Score);
        // console.log("F4 " + funded4Score);

        score11= funded1Score + funded2Score + funded3Score + funded4Score + 0;
        // var bonusScoreFunded = 0;
        // if(fundedScore > Max_Research_Score)
        //  {
        //  bonusScoreFunded = fundedScore - Max_Research_Score;
        //  }
        // console.log("Bonus Funded " + bonusScoreFunded);
        // $("#projectScoreDisplay").val(fundedScore);
        
        /*if (consultingProjects1 > 0 || consultingProjects2 > 0 || consultingProjects3 > 0 || consultingProjects4 > 0) {
            var consulting1Score = (consultingProjects1 != 0) ? ((consultingProjects1 >= 1) ? consultingProjects1 * Max_Research_Score : 0) : 0;
            var consulting2Score = (consultingProjects2 != 0) ? ((consultingProjects2 >= 1.66) ? (0.6 * Max_Research_Score * consultingProjects2) : (0.6 * Max_Research_Score * consultingProjects2)) : 0;
            var consulting3Score = (consultingProjects3 != 0) ? ((consultingProjects3 >= 2) ? (0.5 * Max_Research_Score * consultingProjects3) : (0.5 * Max_Research_Score * consultingProjects3)) : 0;
            var consulting4Score = (consultingProjects4 != 0) ? ((consultingProjects4 >= 5) ? (0.2 * Max_Research_Score * consultingProjects4) : (0.2 * Max_Research_Score * consultingProjects4)) : 0;

            score12 = parseInt(consulting1Score) + parseInt(consulting2Score) + parseInt(consulting3Score) + parseInt(consulting4Score) + 0;
            if (score12 > Max_Research_Score) {
                score12 = Max_Research_Score;
                bonusScoreFrom12 = consultancyBonusCalculator(consultingProjects1, consultingProjects2, consultingProjects3, consultingProjects4);
            }
        } else {
            score12 = 0;
        }*/
    } else
         {
            score11 = 0;
         }

         if (consultingProjects1 > 0 || consultingProjects2 > 0 || consultingProjects3 > 0 || consultingProjects4 > 0) {
        
        var consulting1Score =  consultingProjects1 * Max_Research_Score * 1;
        var consulting2Score = consultingProjects2 * Max_Research_Score * 0.6;
        var consulting3Score = consultingProjects3 * Max_Research_Score * 0.5;
        var consulting4Score = consultingProjects4 * Max_Research_Score * 0.2;
        
        // console.log("C1" + consulting1Score);
        // console.log("C2" + consulting2Score);
        // console.log("C3" + consulting3Score);
        // console.log("C4" + consulting4Score);
        score12 = consulting1Score + consulting2Score + consulting3Score + consulting4Score + 0;
        // var bonusScoreConsult = 0;
        // if(consultScore > Max_Research_Score)
        //  {
        //  bonusScoreConsult = consultScore - Max_Research_Score;
            
        //  }
        // console.log("Bonus Consult" + bonusScoreConsult);
        // $("#consultingProjScoreDisplay").val(consultScore);
    } else {
        score12 = 0;
    }
        if (chairReview > 0) {
            score13 = 0.05 * Max_Service_Score;
        } else {
            score13 = 0;
        }

        if (fiveDayWorkShop > 0 || threeDayWorkShop > 0) {
            if (fiveDayWorkShop == 0) {
                score14 = 0.05 * Max_Service_Score;
            } else if (threeDayWorkShop == 0) {
                score14 = 0.1 * Max_Service_Score;
            } else {
                var fiveDayScore = (0.1 * Max_Service_Score);
                var threeDayScore = (0.05 * Max_Service_Score);
                score14 = fiveDayScore + threeDayScore + 0;
            }
        } else {
            score14 = 0;
        }

        if (invitedTalksOutside > 0) {
            score15 = (0.1 * Max_Service_Score);
        } else {
            score15 = 0;
        }

        if (eventsOutside > 0) {
            score16 = (0.1 * Max_Service_Score);
        } else {
            score16 = 0;
        }

        if (invitedTalksInside > 0) {
            score17 = 0.05 * Max_Service_Score;
        } else {
            score17 = 0;
        }

        if (industryRelations > 0) {
            score18 = 0.1 * Max_Service_Score;
        } else {
            score18 = 0;
        }

        if (instDeptServicesCoordinator > 0 || instDeptServicesOthers > 0) {
            if (instDeptServicesOthers == 0) {
                score19 = 0.2 * Max_Service_Score;
            } else if (instDeptServicesCoordinator == 0) {
                score19 = 0.05 * Max_Service_Score;
            } else {
                var coordinatorScore = (0.05 * Max_Service_Score);
                var otherScore = (0.2 * Max_Service_Score);
                score19 = coordinatorScore + otherScore + 0;
            }
        } else {
            score19 = 0;
        }

        if (othServices > 0) {
            score20 = parseFloat((0.03 * Max_Service_Score).toFixed(2));
        } else {
            score20 = 0;
        }

        if (awardsHonours > 0) {
            score21 = ((0.15 * awardsHonours * Max_Service_Score) >= Max_Service_Score) ? Max_Service_Score : (0.15 * awardsHonours * Max_Service_Score);
        } else {
            score21 = 0;
        }

        if (profTeam > 0) {
            score22 = parseFloat((0.02 * Max_Service_Score).toFixed(2));
        } else {
            score22 = 0;
        }

        Teaching_Score = ((score1 + 0) <= Max_Teaching_Score) ? (score1 + 0) : Max_Teaching_Score ;
        serScore = ((score13 + score14 + score15 + score16 + score17 + score18 + score19 + score20 + score21 + score22 + 0) <= Max_Service_Score) ? (score13 + score14 + score15 + score16 + score17 + score18 + score19 + score20 + score21 + score22 + 0) : Max_Service_Score;
        //resScore = ((score3 + score4 + score5 + score6 + score8 + score9 + score10 + 0) <= Max_Research_Score) ? (score3 + score4 + score5 + score6 + score8 + score9 + score10 + 0) : Max_Research_Score;
        //bonusFinder(score2, score7, score11, score12);
        resScore = (score3 + score4 + score5 + score6 + score8 + score9 + score10 + 0);
        bonusScore = score2 + score7 + score11 + score12 + 0;
        bonusS(resScore, bonusScore);
        
        totalScore = Teaching_Score + serScore + resScore + 0;
        totalScore = parseFloat(totalScore.toFixed(1));
        // bonusScore = parseInt(bonusScoreFrom2) + parseInt(bonusScoreFrom7) + parseInt(bonusScoreFrom11) + parseInt(bonusScoreFrom12);
        finalScore = (totalScore) + (bonusScore) + 0;
        finalScore = parseFloat(finalScore.toFixed(1));

        if (totalScore > 100) {
            totalScore = 100;
        }

        $("#totalScore").val(totalScore);
        $("#bonusScore").val(bonusScore);
        $("#finalScore").val(finalScore);

        $("#fciScoreDisplay").val(score1);
        $("#nirfJournalsDisplay").val(score2);
        $("#indexedPapersDisplay").val(score3);
        $("#journalPublicationDisplay").val(score4);
        $("#bookScoreDisplay").val(score5);
        $("#disclosuresFiledDisplay").val(score6);
        $("#patentsGrantedDisplay").val(score7);
        $("#researchGuidanceUgDisplay").val(score8);
        $("#researchGuidanceMasterDisplay").val(score9);
        $("#researchGuidancePhdDisplay").val(score10);

        $("#projectScoreDisplay").val(score11);
        $("#consultingProjScoreDisplay").val(score12);

        $("#chairReviewerDisplay").val(score13);

        $("#workshopScoreDisplay").val(score14);

        $("#invitedTalksOutsideDisplay").val(score15);
        $("#eventsOutsideDisplay").val(score16);
        $("#invitedTalksInsideDisplay").val(score17);
        $("#industryRelationsDisplay").val(score18);
        $("#deptServiceScoreDisplay").val(score19);
        $("#othServicesDisplay").val(score20);
        $("#awardsHonoursDisplay").val(score21);
        $("#profTeamDisplay").val(score22);
    }
});