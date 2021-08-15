let showclients = document.getElementById('showclients');
let newrequests = document.getElementById('newrequests');
if(showclients) {
fetch('/api/lawyer/appointments')
    .then(res => {return res.json()})
    .then(lawyer => {
        let {appointments} = lawyer[0];
        let flag = true;
        let table = document.createElement('table');
        table.setAttribute('class','table table-hover');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        for(let i=0,j=0;i<appointments.length;i++) {
            if(appointments[i].accepted) {
                let div1 = document.createElement('div');
                div1.setAttribute('class','col-lg-4 col-md-6 d-flex align-items-stretch');
                let div2 = document.createElement('div');
                div2.setAttribute('class','icon-box');
                let div3 = document.createElement('div');
                div3.setAttribute('class','icon');
                let img = document.createElement('img');
                img.setAttribute('src','../Images/defaultuser.png');
                img.classList.add('image');
                div3.append(img);
                let div4 = document.createElement('div');
                let div5 = document.createElement('div');
                let div6 = document.createElement('div');
                div4.setAttribute('class','mt-3');
                div5.setAttribute('class','mt-1');
                div6.setAttribute('class','mt-1');
                let s1 = document.createElement('strong');
                let s2 = document.createElement('strong');
                let s3 = document.createElement('strong');
                s1.append(document.createTextNode('Name: '));
                s2.append(document.createTextNode('Date: '));
                s3.append(document.createTextNode('Time: '));
                div4.append(s1, document.createTextNode(appointments[i].clientname));
                div5.append(s2, document.createTextNode(appointments[i].date));
                div6.append(s3, document.createTextNode(appointments[i].timeslot));
                let div7 = document.createElement('div');
                div7.setAttribute('class','col-12 text-center mt-3');
                let btn = document.createElement('button');
                btn.setAttribute('class','btn btn-success btn-sm');
                btn.setAttribute('data-toggle','modal');
                btn.setAttribute('data-target','#staticBackdrop');
                btn.append(document.createTextNode('Show details'));
                btn.onclick = () => {
                    document.getElementById('bid').innerHTML = appointments[i].bookingId;
                    document.getElementById('name').innerHTML = appointments[i].clientname;
                    document.getElementById('email').innerHTML = appointments[i].email;
                    document.getElementById('date').innerHTML = appointments[i].date;
                    document.getElementById('time').innerHTML = appointments[i].timeslot;
                }
                div7.append(btn);
                div2.append(div3,div4,div5,div6,div7);
                div1.append(div2);
                showclients.append(div1);
            } else {
                if(flag) {
                    let tr = document.createElement('tr');
                    let headings = ['S.NO','Booking ID','Date','Time','Actions'];
                    for(let head of headings) {
                        let th = document.createElement('th');
                        th.append(document.createTextNode(head));
                        tr.append(th);
                    }  
                    thead.append(tr); 
                    flag=false;
                }
                let tr = document.createElement('tr');
                tr.setAttribute('class','table-light');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                let td5 = document.createElement('td');
                td1.append(document.createTextNode(++j));
                td2.append(document.createTextNode(appointments[i].bookingId));
                td3.append(document.createTextNode(appointments[i].date));
                td4.append(document.createTextNode(appointments[i].timeslot));
                let div = document.createElement('div');
                let accept = document.createElement('button');
                let reject = document.createElement('button');
                accept.append(document.createTextNode('Accept'));
                reject.append(document.createTextNode('Reject'));
                accept.setAttribute('class','btn btn-success btn-sm');
                reject.setAttribute('class','btn btn-danger btn-sm');
                accept.setAttribute('id',appointments[i].bookingId);
                reject.setAttribute('id',appointments[i].bookingId);
                accept.onclick = () => {
                    let id = accept.getAttribute('id');
                    fetch(`/api/acceptclient/${id}`, {method: 'PATCH'}) .catch(err => console.error(err));
                    location.reload();
                }
                reject.onclick = () => {
                    let id = reject.getAttribute('id');
                    fetch(`/api/rejectclient/${id}`, {method: 'PATCH'}) .catch(err => console.error(err));
                    location.reload();
                }
                div.classList.add('flex');
                div.append(accept,reject);
                td5.append(div)
                tr.append(td1,td2,td3,td4,td5);
                tbody.append(tr);
            }
        }
        table.append(thead,tbody);
        newrequests.append(table);
    })
    .catch(err => console.error(err));
}
