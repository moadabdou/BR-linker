let elm = s('.nav');

function getu(f){
    var r= new XMLHttpRequest();
    r.open('GET', 'get_users.php?f='+f,true);
    r.send();
    r.onreadystatechange = function (){
        if(r.readyState == 4&&r.status == 200){
            if (r.responseText != 'walo'){
                var data = JSON.parse(r.responseText);
                for(var i = 0; i<data.length; i++ ){
                    var d = data[i];
                    var q = "<div class='person' data-id='"+d.user_id+"'><span class='name'>"+d.username+"</span><span class = 'send'>send request</span></div>";
                    document.querySelector('.users').insertAdjacentHTML('beforeEnd', q);
                }
                scan();
            }
            
        }
    };
}
var el = document.querySelector('.nav');
getu(0);
el.onclick = function (){
    var f = document.querySelector('.users').children.length >= 1 ? document.querySelector('.users').lastChild.dataset.id :0;
    getu(f);
};
function setfr(id,name){
    var r= new XMLHttpRequest();
    r.open('GET', 'set_frq.php?n='+name+'&i='+id,true);
    r.send();
}
function setn(el,n){
    var id = el.dataset.id;
    var r= new XMLHttpRequest();
    r.open('GET', 'set_n.php?id='+id,true);
    r.send();
    r.onreadystatechange = function (){
        if(r.readyState == 4&&r.status == 200){
            var m = document.querySelector('.s');
            if (r.responseText=='done'){
                m.children[0].innerText = n;
                setfr(id , n);
                el.remove();

            }else{
                m.children[0].innerText = 'connection err';
            }
            
        }
    };
}
function scan(){
    var send = document.querySelectorAll('.send');
    send.forEach(function (el){
        el.onclick = function (){
            var el = this.parentElement;
            var n = this.previousSibling.innerText;
            setn(el,n);
        };
    });

}
