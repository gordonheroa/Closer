var injected;
chrome.runtime.onMessage.addListener(
  function(request, sender) {
    injected = request.key;
  }
);
var FormElement = document.getElementsByTagName("form")[0];
var fields = FormElement.querySelectorAll("textarea");
fields.forEach(function(item) {
            var formTitle = item.closest("div[role='listitem']").querySelector("div[role='heading']").firstChild.textContent;
            if (formTitle.trim() == "codelocation") {
                item.value = injected;
                item.setAttribute("data-initial-value", injected);
                item.setAttribute("badinput", "false");
                item.parentElement.previousElementSibling.style.display = "none";
            }
        });