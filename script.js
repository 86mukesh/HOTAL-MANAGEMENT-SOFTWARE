const roomPhotos={
  Deluxe:['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500','https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500'],
  Suite:['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500','https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500'],
  Presidential:['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500','https://images.unsplash.com/photo-1591088398332-8a7791972843?w=500']
};

let rooms=[];let id=101;
['Deluxe','Suite','Presidential'].forEach(type=>{
  for(let i=0;i<15;i++){
    let s=Math.random();
    rooms.push({
      room_no:id++,
      type,
      price:type=='Deluxe'?3500:type=='Suite'?7500:15000,
      status:s>0.6?'Available':s>0.3?'Occupied':'Cleaning',
      ac:'AC',
      bed:i%2==0?'King Bed':'Double Bed',
      size:type=='Deluxe'?'300 sqft':type=='Suite'?'500 sqft':'800 sqft',
      photos:roomPhotos[type]
    });
  }
});

let bookings=JSON.parse(localStorage.getItem('bobbexo_final_both')||'[]');
let employees=JSON.parse(localStorage.getItem('bobbexo_emp_both')||'[]');
let restOrders=JSON.parse(localStorage.getItem('bobbexo_rest_both')||'[]');
if(employees.length==0){
  employees=[
    {name:'Sunita Devi',gender:'Female',role:'Housekeeping',join:'2023-05-10',timing:'9 AM - 6 PM',salary:12000,status:'Paid'},
    {name:'Ramesh Kumar',gender:'Male',role:'Security',join:'2022-11-01',timing:'9 PM - 9 AM Night',salary:15000,status:'Pending'}
  ];
}

let currentFilter='All';

function renderAll(){
  let dash=document.getElementById('roomGridDash');dash.innerHTML='';let av=0;
  rooms.forEach(r=>{
    if(r.status=='Available')av++;
    let cls=r.status=='Available'?'r-green':r.status=='Occupied'?'r-red':'r-yellow';
    dash.innerHTML+=`<div class="room-box ${cls}" onclick="openRoom(${r.room_no})">${r.room_no}<div style="font-size:8px;font-weight:400">${r.type}</div></div>`;
  });
  document.getElementById('totalRooms').innerText=rooms.length;
  document.getElementById('availVal').innerText=av;
  document.getElementById('bookCount').innerText=bookings.length;
  document.getElementById('totalStaff').innerText=employees.length;
  document.getElementById('revVal').innerText='₹'+bookings.reduce((s,b)=>s+parseInt(b.amount||0),0).toLocaleString('en-IN');
  document.getElementById('restSale').innerText='₹'+restOrders.reduce((s,o)=>s+parseInt(o.price||0),0).toLocaleString('en-IN');

  renderLuxury();
  document.getElementById('bookTable').innerHTML=bookings.map(b=>`<tr><td>${b.guest}</td><td>${b.room}</td><td>₹${b.amount}</td><td><button class="gold-btn" style="padding:4px 8px;font-size:10px" onclick="alert('GST Bill for ${b.guest}')">Bill</button></td></tr>`).join('')||'<tr><td colspan=4>No bookings</td></tr>';
  document.getElementById('empTable').innerHTML=employees.map(e=>`<tr><td>${e.name}</td><td>${e.gender=='Female'?'👩 Ladki':'👨 Ladka'}</td><td>${e.role}</td><td>${e.join}</td><td>${e.timing}</td><td>₹${e.salary}</td><td><span style="background:${e.status=='Paid'?'#10B98122':'#F59E0B22'};color:${e.status=='Paid'?'#10B981':'#F59E0B'};padding:2px 8px;border-radius:10px;font-size:10px">${e.status}</span></td></tr>`).join('');
  document.getElementById('rSelect').innerHTML='<option>Select Room</option>'+rooms.filter(r=>r.status=='Available').map(r=>`<option value="${r.room_no}">${r.room_no} - ${r.type} ₹${r.price}</option>`).join('');
  document.getElementById('restRoom').innerHTML='<option>Select Room</option>'+rooms.filter(r=>r.status=='Occupied').map(r=>`<option value="${r.room_no}">Room ${r.room_no}</option>`).join('');
  document.getElementById('restOrders').innerHTML=restOrders.map(o=>`<div style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.1);display:flex;justify-content:space-between"><span>Room ${o.room} - ${o.item} - ₹${o.price}</span><small>${o.time}</small></div>`).join('')||'No orders';
}

function renderLuxury(){
  let grid=document.getElementById('luxuryRooms');grid.innerHTML='';
  let filtered=currentFilter=='All'?rooms:rooms.filter(r=>r.type==currentFilter);
  filtered.forEach(r=>{
    let cls=r.status=='Available'?'#10B981':r.status=='Occupied'?'#EF4444':'#F59E0B';
    grid.innerHTML+=`<div class="luxury-card" onclick="openRoom(${r.room_no})"><img src="${r.photos[0]}"><div class="luxury-info"><div style="display:flex;justify-content:space-between"><h4>${r.type} ${r.room_no}</h4><span style="background:${cls};padding:2px 8px;border-radius:10px;font-size:10px">${r.status}</span></div><div style="font-size:11px;opacity:0.7;margin:4px 0">${r.size} | ${r.bed}</div><div style="color:#C5A059;font-weight:700">₹${r.price}/night</div></div></div>`;
  });
}

function filterRooms(t){currentFilter=t;renderLuxury()}

function openRoom(no){
  let r=rooms.find(x=>x.room_no==no);let b=bookings.find(x=>x.room==no);
  document.getElementById('roomTitle').innerText=`${r.type} - Room ${r.room_no} - Luxury View`;
  document.getElementById('roomImg').src=r.photos[0];
  document.getElementById('roomThumbs').innerHTML=r.photos.map(p=>`<img src="${p}" style="width:60px;height:40px;object-fit:cover;border-radius:6px;margin-right:6px;cursor:pointer;border:1px solid rgba(197,160,89,0.3)" onclick="document.getElementById('roomImg').src='${p}'">`).join('')+`<div style="margin-top:10px;background:rgba(197,160,89,0.1);border:1px dashed #C5A059;padding:8px;border-radius:8px;text-align:center">🎥 3D Tour<button class="gold-btn" style="margin-top:6px;width:100%" onclick="alert('3D Tour Opening!')">▶️ Play 3D</button></div>`;
  document.getElementById('roomInfo').innerHTML=`<div style="background:rgba(197,160,89,0.1);padding:10px;border-radius:10px;line-height:1.6;font-size:13px"><b>Room:</b> ${r.room_no}<br><b>Type:</b> ${r.type}<br><b>Size:</b> ${r.size}<br><b>Bed:</b> ${r.bed}<br><b>AC:</b> ${r.ac}<br><b>Price:</b> ₹${r.price}<br><b>Status:</b> ${r.status}</div>${b?`<div style="background:rgba(16,185,129,0.1);padding:10px;border-radius:10px;margin-top:8px"><b>Guest:</b> ${b.guest}<br><b>Phone:</b> ${b.phone}</div>`:''}<button class="gold-btn full" style="margin-top:10px" onclick="bookThis(${r.room_no},${r.price})">Book This Room</button>`;
  document.getElementById('roomModal').classList.add('active');
}

function bookThis(no,price){
  document.getElementById('rSelect').value=no;
  document.getElementById('amt').value=price;
  document.getElementById('roomModal').classList.remove('active');
  document.getElementById('bookingModal').classList.add('active');
}

function switchTab(id){
  document.querySelectorAll('.tab').forEach(t=>t.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  let el=document.querySelector(`.nav-item[onclick*="${id}"]`);
  if(el) el.classList.add('active');
  document.querySelectorAll('.b-item').forEach((b,i)=>{
    let map=['dashboard','rooms','restaurant','staff','bookings'];
    b.classList.toggle('active',map[i]==id);
  });
}

function switchTabMobile(id,el){
  switchTab(id);
  document.querySelectorAll('.b-item').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
}

function openBooking(){document.getElementById('bookingModal').classList.add('active')}
function closeBooking(){document.getElementById('bookingModal').classList.remove('active')}
function openStaff(){document.getElementById('staffModal').classList.add('active')}
function closeStaff(){document.getElementById('staffModal').classList.remove('active')}
function closeRoom(){document.getElementById('roomModal').classList.remove('active')}

function saveBooking(){
  let gn=document.getElementById('gName').value,ph=document.getElementById('gPhone').value,rn=document.getElementById('rSelect').value,amt=document.getElementById('amt').value||3500;
  if(!gn||!rn) return alert('Fill Name & Room');
  bookings.push({guest:gn,phone:ph,room:parseInt(rn),amount:amt});
  localStorage.setItem('bobbexo_final_both',JSON.stringify(bookings));
  let rm=rooms.find(r=>r.room_no==rn);if(rm) rm.status='Occupied';
  closeBooking();renderAll();
}

function saveEmp(){
  let n=document.getElementById('eName').value,g=document.getElementById('eGender').value,r=document.getElementById('eRole').value,j=document.getElementById('eJoin').value||new Date().toISOString().split('T')[0],t=document.getElementById('eTiming').value,s=document.getElementById('eSalary').value;
  if(!n||!g||!s) return alert('Fill all');
  employees.push({name:n,gender:g,role:r,join:j,timing:t,salary:s,status:'Pending'});
  localStorage.setItem('bobbexo_emp_both',JSON.stringify(employees));
  closeStaff();renderAll();
}

function addRestOrder(){
  let room=document.getElementById('restRoom').value,item=document.getElementById('restItem').value;
  if(room.includes('Select')) return alert('Select Room');
  let price=item.match(/₹(\d+)/)[1];
  restOrders.push({room,item,price,time:new Date().toLocaleTimeString()});
  localStorage.setItem('bobbexo_rest_both',JSON.stringify(restOrders));
  renderAll();
}

renderAll();