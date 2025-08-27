// main.js — простий скрипт для модальних форм та обробки форм
document.addEventListener('DOMContentLoaded', function(){
  const servicesData = [
    {id: 'web-design', title: 'Веб-дизайн', price: 8000, short: 'Сучасний дизайн сайтів', img:'img/service1.svg'},
    {id: 'seo', title: 'SEO-просування', price: 6000, short: 'Підвищення видимості у пошуку', img:'img/service2.svg'},
    {id: 'consult', title: 'Консультація', price: 1500, short: 'Бізнес-аналіз та рекомендації', img:'img/service3.svg'},
    {id: 'dev', title: 'Розробка', price: 15000, short: 'Розробка сайту під ключ', img:'img/service4.svg'},
    {id: 'smm', title: 'SMM', price: 5000, short: 'Просування в соцмережах', img:'img/service5.svg'},
    {id: 'branding', title: 'Брендинг', price: 7000, short: 'Стратегія бренду та айдентика', img:'img/service6.svg'}
  ];

  // render preview services on index
  const svcList = document.getElementById('services-list');
  const svcGrid = document.getElementById('services-grid');
  [svcList, svcGrid].forEach(container => {
    if(!container) return;
    container.innerHTML = servicesData.slice(0, container===svcList?3:servicesData.length).map(s=>`
      <div class="card service-card">
        <img src="${s.img}" alt="${s.title}" style="height:120px;object-fit:contain"/>
        <h4>${s.title}</h4>
        <p>${s.short}</p>
        <p class="muted">${s.price} грн</p>
        <div class="actions"><button class="btn btn-outline btn-order" data-id="${s.id}">Замовити</button></div>
      </div>
    `).join('');
  });

  // populate order select
  const orderSelects = document.querySelectorAll('#order-service');
  orderSelects.forEach(sel => {
    sel.innerHTML = servicesData.map(s=>`<option value="${s.id}">${s.title} — ${s.price} грн</option>`).join('');
  });

  // modal controls
  const modal = document.getElementById('modal');
  const closeButtons = document.querySelectorAll('[data-close], .modal-close');
  function openModal(){
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    // reset form state
    document.getElementById('order-form').hidden = false;
    document.getElementById('order-ok').hidden = true;
  }
  closeButtons.forEach(b=>b.addEventListener('click', closeModal));

  // open modal from header/buttons
  document.getElementById('btn-hero-order')?.addEventListener('click', openModal);
  document.getElementById('btn-signup')?.addEventListener('click', openModal);
  document.getElementById('btn-order')?.addEventListener('click', openModal);

  // open order from service card
  document.querySelectorAll('.btn-order').forEach(btn=>{
    btn.addEventListener('click', function(e){
      const id = e.currentTarget.dataset.id;
      const sel = document.getElementById('order-service');
      if(sel){
        sel.value = id;
      }
      openModal();
    });
  });

  // order form submit (demo) — replace with EmailJS or fetch to webhook
  const orderForm = document.getElementById('order-form');
  orderForm?.addEventListener('submit', function(e){
    e.preventDefault();
    const fd = new FormData(orderForm);
    // basic validation already via required attrs
    // here — show success and clear form
    document.getElementById('order-form').hidden = true;
    document.getElementById('order-ok').hidden = false;

    // --- Example: send via EmailJS (uncomment and configure) ---
    /*
    emailjs.init('YOUR_EMAILJS_USER_ID');
    emailjs.send('service_id','YOUR_TEMPLATE_ID', {
      service: fd.get('service'),
      name: fd.get('name'),
      phone: fd.get('phone'),
      email: fd.get('email'),
      message: fd.get('message')
    }).then(function(){ console.log('Email sent'); }, function(err){ console.error(err); });
    */
  });

  // contact form (demo)
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', function(e){
    e.preventDefault();
    // show success
    document.getElementById('contact-ok').hidden = false;
    contactForm.reset();
    setTimeout(()=>document.getElementById('contact-ok').hidden = true, 4000);
  });

  // subscribe form simple demo
  document.getElementById('subscribe-form')?.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Дякуємо! Ви успішно підписані.');
    e.target.reset();
  });

  // set years
  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
  document.getElementById('year2') && (document.getElementById('year2').textContent = new Date().getFullYear());
  document.getElementById('year3') && (document.getElementById('year3').textContent = new Date().getFullYear());
  document.getElementById('year4') && (document.getElementById('year4').textContent = new Date().getFullYear());
});
