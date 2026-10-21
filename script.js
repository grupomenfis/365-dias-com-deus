const M=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];const pad=n=>String(n).padStart(2,"0"),key=(m,d)=>`${pad(m)}-${pad(d)}`,map=new Map(VERSES.map(v=>[key(v.month,v.date),v]));let selected=new Date();function item(d){if(d.getMonth()==1&&d.getDate()==29)return map.get("02-28");return map.get(key(d.getMonth()+1,d.getDate()))}const BIBLE_BOOKS={"1 Coríntios": "1CO", "1 João": "1JN", "1 Pedro": "1PE", "1 Tessalonicenses": "1TH", "2 Coríntios": "2CO", "2 Timóteo": "2TI", "Colossenses": "COL", "Deuteronômio": "DEU", "Eclesiastes": "ECC", "Efésios": "EPH", "Filipenses": "PHP", "Gálatas": "GAL", "Hebreus": "HEB", "Isaías": "ISA", "Jeremias": "JER", "Josué": "JOS", "João": "JHN", "Lamentações": "LAM", "Lucas": "LUK", "Mateus": "MAT", "Miqueias": "MIC", "Provérbios": "PRO", "Romanos": "ROM", "Salmos": "PSA", "Tiago": "JAS", "Zacarias": "ZEC"};
function naaUrl(reference){
 const m=reference.match(/^(.+?)\s+(\d+):(\d+)(?:[-–](\d+))?$/);
 if(!m || !BIBLE_BOOKS[m[1]])return 'https://www.bible.com/pt/versions/1840-naa-nova-almeida-atualizada';
 const [,book,chapter,first,last]=m;
 const passage=`${BIBLE_BOOKS[book]}.${chapter}.${first}${last?'-'+last:''}.NAA`;
 return `https://www.bible.com/pt/bible/1840/${passage}`;
}
function render(){
 const v=item(selected);
 if(!v)return;
 dateLabel.textContent=`${selected.getDate()} de ${M[selected.getMonth()]}`;
 verse.textContent=`“${v.text}”`;
 verse.classList.toggle('verse-long',v.text.length>240);
 verse.classList.toggle('verse-very-long',v.text.length>410);
 ref.textContent=v.reference;
 const naa=document.getElementById('naaLink');
 if(naa)naa.href=naaUrl(v.reference);
}
function move(n){selected=new Date(selected.getFullYear(),selected.getMonth(),selected.getDate()+n);render()}prev.onclick=()=>move(-1);next.onclick=()=>move(1);today.onclick=()=>{selected=new Date();render()};choose.onclick=()=>{picker.hidden=!picker.hidden;if(!picker.hidden){picker.focus();}};picker.onchange=()=>{if(!picker.value)return;let[y,m,d]=picker.value.split("-").map(Number);selected=new Date(y,m-1,d);render();picker.hidden=true};render();