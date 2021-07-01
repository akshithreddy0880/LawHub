window.onload = () => {
    let showlawyers = document.getElementById('showlawyers');
    if(showlawyers) {
    fetch(`/api/lawyers`)
        .then(res => {return res.json()})
        .then(lawyers => {
            for(let lawyer of lawyers) {
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
                s2.append(document.createTextNode('Type: '));
                s3.append(document.createTextNode('Experince: '));
                div4.append(s1, document.createTextNode(lawyer.username));
                div5.append(s2, document.createTextNode(lawyer.type));
                div6.append(s3, document.createTextNode(`${lawyer.experience} in years`));
                let div7 = document.createElement('div');
                div7.setAttribute('class','col-12 text-center mt-3');
                let div8 = document.createElement('div');
                div8.setAttribute('class','btn btn-success btn-sm');
                div8.append(document.createTextNode('Book appointment'));
                div7.append(div8);
                div2.append(div3,div4,div5,div6,div7);
                div1.append(div2);
                showlawyers.append(div1);
            }
        })
        .catch(err => console.error(err));
    }
}