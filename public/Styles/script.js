function toggleBox()
{
    $("#inputBox").toggleClass("visible");
    // $("body").css("backgroundColor","black");
    $(".container").toggleClass("blurred");
    $("footer").toggleClass("blurred");
    $("nav").toggleClass("blurred");
    // alert(task);
}
$("#add01").click(toggleBox);
$("#cancel").click(toggleBox);

function addListItem()
{
    const listItem=document.createElement("li");
    const task1=document.getElementById("inputBox");
    task1.value=task;
    listItem.innerHTML=task1;
    // const node=document.createTextNode(`${task}`);
    // listItem.appendChild(node);

    const parent=document.getElementById("mainList");
    parent.appendChild(listItem);
    toggleBox();
}
$("#add02").click(addListItem);
alert(document.getElementById("inputBox").value);