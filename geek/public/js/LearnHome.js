/*展示切换*/
$(function() {
	$(".title span").click(function() {
		var index = $(this).index();
		$(this).addClass("SpanBorder").siblings().removeClass("SpanBorder");
		var show = ["$('#show1')","$('#show2')","$('#show3')","$('#show4')"];
		$('.PictureShow').hide();
		var i = show[index];
		if(index == 0) {
			$('#show1').show();
		}
		else if(index == 1) {
			$('#show2').show();
		}
		else if(index == 2) {
			$('#show4').show();
		}
		else if(index == 3) {
			$('#show4').show();
		} 
	});

})

/*展开收起*/
window.onload = function() {
function BrowseMore (id1,id2) {
    var more = document.getElementById(id1);
    var br1 = document.getElementById('BookRecommendation1');
    var br2 = document.getElementById('BookRecommendation2');
    //var br3 = document.getElementById('BookRecommendation3');
    var br4= document.getElementById('BookRecommendation4');
    var detail = document.getElementById(id2);
    more.onclick = function() {
        br1.style.display = 'none';
        br2.style.display = 'none';
        //br3.style.display = 'none';
        br4.style.display = 'none';
        detail.style.display = 'block';
    }
}
BrowseMore('more1','detail1');
BrowseMore('more2','detail2');
/*BrowseMore('more3','detail3');*/
BrowseMore('more4','detail4');
function PickUp(id1,id2) {
	var pu = document.getElementById(id1);
    var br1 = document.getElementById('BookRecommendation1');
    var br2 = document.getElementById('BookRecommendation2');
    //var br3 = document.getElementById('BookRecommendation3');
    var br4= document.getElementById('BookRecommendation4');
    var detail = document.getElementById(id2);
    pu.onclick = function() {
        br1.style.display = 'block';
        br2.style.display = 'block';
        //br3.style.display = 'block';
        br4.style.display = 'block';
        detail.style.display = 'none';
    } 
}
PickUp('PickUp1','detail1');
PickUp('PickUp2','detail2');
/*PickUp('PickUp3','detail3');*/
PickUp('PickUp4','detail4');
}
