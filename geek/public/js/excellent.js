// 让学姐学长寄语字出现
$(document).ready(function(){
    $("#wish_word").ticker({
    sorList: " ",
    rate: 100,
    delay: 4000
   }).trigger("play").trigger("stop");
 });
//让表格变色
$(document).ready(function(){
    $("tr:odd").addClass("odd");
    $("tr:even").addClass("even");
    $("tr").mouseover(function(){
    $(this).addClass("selected").siblings().removeClass("selected").end();
    });
    $("tr").click(function(){
      $(this).removeClass("selected");
    });
  //成员变化
$("#Li1").click(function(){
  $("#table2").hide();
  $("#table3").hide();
  $("#table4").hide();
  $("#table5").hide();
  $("#table1").show();
});
$("#Li2").click(function(){
  $("#table1").hide();
  $("#table3").hide();
  $("#table4").hide();
  $("#table5").hide();
  $("#table2").show();
});
$("#Li3").click(function(){
  $("#table1").hide();
  $("#table2").hide();
  $("#table4").hide();
  $("#table5").hide();
  $("#table3").show();
});
$("#Li4").click(function(){
  $("#table1").hide();
  $("#table2").hide();
  $("#table3").hide();
  $("#table5").hide();
  $("#table4").show();
});
$("#Li5").click(function(){
  $("#table1").hide();
  $("#table2").hide();
  $("#table3").hide();
  $("#table4").hide();
  $("#table5").show();
});
})