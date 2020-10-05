/* eslint-disable no-undef */

// firsTime when someone open the project from database, don't publish it, maybe the other add another thing
function compile(sendSocket) {
  var html = document.getElementById("html");
  var css = document.getElementById("css");
  var js = document.getElementById("js");
  var code = document.getElementById("code").contentWindow.document;

  code.open();
  const newCode =
        html.value +
        "<style>" +
        css.value +
        "</style>" +
        "<script>" +
        js.value +
        "</script>";
  code.writeln(newCode);
  code.close();
  sendSocket && socket.emit("code", { projectId: projectId.value, code: newCode });
}

document.body.onkeyup = function() {
  compile(true);
};
