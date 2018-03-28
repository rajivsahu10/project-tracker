"use strict";
exports.__esModule = true;
var FS = require("fs");
var child_process = require("child_process");
// git command  
// git -C d:angular\\angularWorkspace\\my-first-app log --remotes=origin --numstat --pretty=oneline --date=short -2 --format="AuthorName:%aN%nAuthorEmail:%aE%nAuthorDate:%ad%nSubject:%s"
var DiffStats = /** @class */ (function () {
    function DiffStats(locAdded, lodDeleted, filetype, fileName) {
        this.locAdded = locAdded;
        this.lodDeleted = lodDeleted;
        this.filetype = filetype;
        this.fileName = fileName;
    }
    return DiffStats;
}());
var Commit = /** @class */ (function () {
    function Commit(authorName, authorEmail, authorDate, subject) {
        this.authorName = authorName;
        this.authorEmail = authorEmail;
        this.authorDate = authorDate;
        this.subject = subject;
        this.diffStats = [];
    }
    Commit.prototype.addDiffStats = function (diffStat) {
        return this.diffStats.push(diffStat);
    };
    Commit.prototype.getDiffStats = function () {
        return this.diffStats;
    };
    Commit.prototype.setDiffStats = function (diffStatsArray) {
        var _this = this;
        diffStatsArray.forEach(function (entry) {
            _this.diffStats.push(entry);
        });
    };
    return Commit;
}());
var LogProcessor = /** @class */ (function () {
    function LogProcessor(event) {
        this.receivedEvent = event;
    }
    LogProcessor.prototype.processCommitInfo = function (rawCommit) {
        // match commit headers :  [a-zA-Z]*:.*
        var commitInfoLines = rawCommit.match(/[a-zA-Z]*:.*/g);
        var authorName = "";
        var authorEmail = "";
        var authorDate = "";
        var subject = "";
        if (commitInfoLines !== null) {
            commitInfoLines.forEach(function (commitInfoEntry) {
                // console.log("--> " + lineEntry);
                //this.processRawCommit(rawCommit);
                var indexOfSeparator = commitInfoEntry.indexOf(":") === undefined ? 0 : commitInfoEntry.indexOf(":");
                var key = commitInfoEntry.substr(0, indexOfSeparator);
                var value = commitInfoEntry.substring(indexOfSeparator);
                switch (key) {
                    case "AuthorName":
                        authorName = value;
                        break;
                    case "AuthorEmail":
                        authorEmail = value;
                        break;
                    case "AuthorDate":
                        authorDate = value;
                        break;
                    case "Subject":
                        subject = value;
                        break;
                }
            });
        }
        return new Commit(authorName, authorEmail, authorDate, subject);
    };
    LogProcessor.prototype.processCommitDiffStats = function (rawCommit) {
        // match commit diffs   :  [\d]*\t[\d]*\t.*
        var diffStatsLines = rawCommit.match(/[\d]*\t[\d]*\t.*/g);
        var diffStats = [];
        if (diffStatsLines !== null) {
            diffStatsLines.forEach(function (diffStatEntry) {
                var values = diffStatEntry.split(/\t/g);
                var locAdded = new Number(values[0]);
                var locDeleted = new Number(values[1]);
                var fileName = values[2].replace(/\//g, ".");
                var filetype = fileName.substr(fileName.lastIndexOf(".") + 1);
                var diffStatObject = new DiffStats(locAdded, locDeleted, filetype, fileName);
                diffStats.push(diffStatObject);
            });
        }
        return diffStats;
    };
    LogProcessor.prototype.processRawCommit = function (rawCommit) {
        var commit = this.processCommitInfo(rawCommit);
        var diffStats = this.processCommitDiffStats(rawCommit);
        commit.setDiffStats(diffStats);
        return commit;
    };
    LogProcessor.prototype.processCmdOutput = function (gitLog) {
        var _this = this;
        console.log("GitLog : START");
        if (gitLog == null || gitLog.length == 0) {
            throw new Error();
        }
        // console.log(gitLog);
        // console.log("current eol : " + OS.EOL);
        var commitsAll = [];
        // working regex : /AuthorName(.*\n){4}(([\d|\-]*\t[\d|\-]*\t.*\n)|\n)*/g
        var commitSnippets = gitLog.match(/AuthorName(.*\n){4}(([\d|\-]*\t[\d|\-]*\t.*\n)|\n)*/g);
        if (commitSnippets !== null) {
            commitSnippets.forEach(function (rawCommit) {
                // console.log("--> " + lineEntry);
                var commit = _this.processRawCommit(rawCommit);
                commitsAll.push(commit);
            });
        }
        console.log(commitsAll);
        console.log("------- now write JSON --------");
        var jsonLog = JSON.stringify(commitsAll, null, 4);
        //console.log(commitsAllJSON);
        //new OutputFileGenerator(commitsAll).generateFile();
        console.log("GitLog : END");
        return jsonLog;
    };
    LogProcessor.prototype.start = function () {
        var _this = this;
        console.log("inside start");
        var gitLogCmd = 'git -C d:/angular/angularWorkspace/my-first-app log --remotes=origin --numstat --pretty=oneline --date=short -2 --format="AuthorName:%aN%nAuthorEmail:%aE%nAuthorDate:%ad%nSubject:%s"';
        var jsonCommitLog = "Empty log ....";
        child_process.exec(gitLogCmd, function (errorObj, stdout, stderr) {
            if (errorObj instanceof Error) {
                console.error(errorObj);
                throw errorObj;
            }
            if (stdout != null) {
                jsonCommitLog = _this.processCmdOutput(stdout);
                _this.receivedEvent.sender.send('load-success', jsonCommitLog);
            }
            if (stderr != null && stderr.length > 0) {
                console.log('stderr ', stderr);
            }
        });
    };
    return LogProcessor;
}());
exports.LogProcessor = LogProcessor;
var OutputFileGenerator = /** @class */ (function () {
    function OutputFileGenerator(commits) {
        this.commits = commits;
    }
    OutputFileGenerator.prototype.generateFile = function () {
        var commitsJSON = JSON.stringify(this.commits, null, 4);
        FS.writeFileSync("myLog.json", commitsJSON);
    };
    return OutputFileGenerator;
}());
// const myApp = new LogProcessor();
// myApp.start();
