/* Page templates. Each page is a function that returns HTML.
   To add a new page: add a function here and point a tile's "route" at its key. */
window.PAGES = {};

PAGES.home = () => {
  const tiles = APP_CONFIG.tiles.map(t => `
    <button class="tile ${t.color}" data-route="${t.route}" aria-label="${t.title}">
      <img class="pic" src="${t.img}" alt="" loading="eager">
      <span class="wash"></span>
      <span class="gloss"></span>
      <span class="spec"></span>
      <span class="label">
        <span class="title">${t.title}</span>
        <span class="sub">${t.sub}</span>
      </span>
    </button>`).join("");
  return `<section class="page home-grid">${tiles}</section>`;
};

PAGES.school = () => {
  const gallery = Array.from({ length: 9 }, (_, i) =>
    `<button data-zoom="assets/gallery/g${i + 1}.webp"><img src="assets/gallery/g${i + 1}.webp" alt="من أنشطة المدرسة" loading="lazy"></button>`
  ).join("");

  return `
  <section class="page intro">
    <div class="hero">
      <img class="pic" src="assets/img/school.webp" alt="">
      <div class="hero-card glass">
        <h1>ثانوية الموهوبين التقنية</h1>
        <p>(بنين - بنات) بالإدارة العامة للتعليم بمحافظة جدة</p>
        <div class="badges">
          <span class="glass-chip">وزارة التعليم</span>
          <span class="glass-chip">أكاديمية طويق</span>
          <span class="glass-chip">رؤية السعودية 2030</span>
        </div>
      </div>
    </div>

    <div class="section glass feature">
      <div>
        <h2><span class="orb"></span>شراكة لصناعة المستقبل</h2>
        <p>تأسست ثانوية الموهوبين التقنية من منطلق رعاية الموهوبين في المجال التقني، بالشراكة بين
        <b>وزارة التعليم</b> و<b>أكاديمية طويق</b>، إيمانًا بدور التقنية والذكاء الاصطناعي في النهضة والتقدم
        ومواكبة التطور التكنولوجي الذي يشكّل ركيزة أساسية لتعزيز الاقتصاد وتنويع المصادر. وتنبثق من رؤية السعودية 2030
        لتكون دولتنا ضمن أعلى الدول عالميًا في تطبيق الذكاء الاصطناعي والإبداع الرقمي.</p>
      </div>
      <img src="assets/img/future.webp" alt="">
    </div>

    <div class="two">
      <div class="section glass">
        <h2><span class="orb" style="--c:#5ccfff"></span>الرؤية</h2>
        <p>الريادة في إعداد جيلٍ موهوبٍ تقنيًا قادرٍ على الابتكار والمنافسة عالميًا، والإسهام في بناء اقتصادٍ معرفيٍ متقدم يدعم تطلعات رؤية المملكة 2030.</p>
      </div>
      <div class="section glass">
        <h2><span class="orb" style="--c:#8cf26a"></span>الرسالة</h2>
        <p>توفير بيئة تعليمية تقنية متقدمة ترعى الموهوبين، وتنمّي مهاراتهم في مجالات التقنية الحديثة مثل الذكاء الاصطناعي والأمن السيبراني والبرمجة، من خلال برامج تعليمية وتدريبية نوعية وشراكات استراتيجية، لإعداد طلاب قادرين على الابتكار وتمثيل المملكة في المنافسات العلمية العالمية.</p>
      </div>
    </div>

    <div class="section glass">
      <h2><span class="orb" style="--c:#ffb347"></span>أهدافنا</h2>
      <div class="cards">
        <div class="card glass"><span class="num">1</span><h3>الاستثمار في المواهب</h3><p>الاستثمار في المواهب التقنية الناشئة.</p></div>
        <div class="card glass"><span class="num">2</span><h3>الابتكار والإبداع</h3><p>التركيز على الابتكار والإبداع التقني.</p></div>
        <div class="card glass"><span class="num">3</span><h3>التمكين والتأهيل</h3><p>تمكين الطلاب وتأهيلهم للتخصصات التقنية.</p></div>
        <div class="card glass"><span class="num">4</span><h3>المنافسة العالمية</h3><p>إعداد الطلاب لتمثيل المملكة في المنافسات العالمية.</p></div>
      </div>
    </div>

    <div class="section glass">
      <h2><span class="orb" style="--c:#c58cff"></span>مجالاتنا</h2>
      <div class="pills">
        <span class="pill glass">البرمجة</span>
        <span class="pill glass">الذكاء الاصطناعي</span>
        <span class="pill glass">الميكاترونيكس</span>
        <span class="pill glass">الأمن السيبراني</span>
      </div>
    </div>

    <div class="two">
      <div class="section glass">
        <h2><span class="orb"></span>برامج أكاديمية طويق</h2>
        <div class="cards">
          <div class="card glass"><h3>البرمجة بلغة Python</h3><p>تنمية مهارات البرمجة والتفكير الحاسوبي.</p></div>
          <div class="card glass"><h3>الأمن السيبراني</h3><p>تعزيز الوعي بمفاهيم أمن المعلومات والحماية الرقمية.</p></div>
          <div class="card glass"><h3>تنمية القدرات (قياس)</h3><p>تطوير مهارات التحليل والتفكير المنطقي والاستعداد لاختبارات القدرات.</p></div>
        </div>
      </div>
      <div class="section glass">
        <h2><span class="orb" style="--c:#8cf26a"></span>برامج ومبادرات المدرسة</h2>
        <div class="cards">
          <div class="card glass"><h3>استراتيجيات التدريس العليا</h3><p>تنمية التفكير النقدي والتحليلي وتعزيز التعلم العميق.</p></div>
          <div class="card glass"><h3>دعم القدرات والتحصيلي</h3><p>رفع مستوى أداء الطلاب في اختبارات القدرات والتحصيل العلمي.</p></div>
          <div class="card glass"><h3>الذكاء الاصطناعي في التعليم</h3><p>توظيف أدواته لدعم التعلم التفاعلي وإنتاج عروض وتطبيقات تعليمية مبتكرة.</p></div>
        </div>
      </div>
    </div>

    <div class="section glass">
      <h2><span class="orb" style="--c:#ffb347"></span>دعم المشاريع الطلابية</h2>
      <div class="feature">
        <div class="bars" aria-label="عدد المشاريع الطلابية">
          <div class="bar"><b>13</b><div class="fill" style="height:38%"></div><span>بداية البرنامج</span></div>
          <div class="bar"><b>26</b><div class="fill" style="height:76%"></div><span>بعد التطوير</span></div>
        </div>
        <p>بدأ البرنامج بـ <b>13</b> مشروعًا طلابيًا، ثم ارتفع العدد إلى <b>26</b> مشروعًا تقنيًا،
        وبذلك أصبح <b>60٪</b> من الطلاب مشاركين فاعلين في مشاريع ابتكارية.</p>
      </div>
    </div>

    <div class="section glass">
      <h2><span class="orb" style="--c:#5ccfff"></span>إنجازات بالأرقام</h2>
      <div class="stats">
        <div class="stat glass"><div class="big">26</div><div class="cap">مشروعًا تقنيًا طلابيًا</div></div>
        <div class="stat glass"><div class="big">60%</div><div class="cap">من الطلاب مشاركون في مشاريع ابتكارية</div></div>
        <div class="stat glass"><div class="big">20</div><div class="cap">مشروعًا تقنيًا ضمن برنامج طويق</div></div>
        <div class="stat glass"><div class="big">6</div><div class="cap">مشاريع رُشّحت لمعرض الشرق الأوسط</div></div>
        <div class="stat glass"><div class="big">6</div><div class="cap">مشاريع نوعية جديدة في معرض إبداع</div></div>
        <div class="stat glass"><div class="big">30</div><div class="cap">طالبًا ترشّحوا للأولمبياد الوطني للعلوم والرياضيات (نسمو)</div></div>
      </div>
    </div>

    <div class="section glass feature">
      <img src="assets/img/ai2026.webp" alt="">
      <div>
        <h2><span class="orb" style="--c:#c58cff"></span>2026 عام الذكاء الاصطناعي</h2>
        <p>وافق مجلس الوزراء في المملكة العربية السعودية على تسمية عام 2026 بعام الذكاء الاصطناعي،
        لتسريع التحول التقني ودعم الابتكار وتنمية الكفاءات الوطنية، وتوسيع تطبيقات الذكاء الاصطناعي
        في التعليم والاقتصاد والخدمات، بما يتوافق مع مستهدفات رؤية السعودية 2030.</p>
      </div>
    </div>

    <div class="section glass">
      <h2><span class="orb" style="--c:#8cf26a"></span>ما يميّز مدرستنا</h2>
      <ul class="ticks">
        <li>شراكات وتوقيع اتفاقيات</li>
        <li>دعم قدرات الطلاب المعرفية عبر برامج مكثفة</li>
        <li>برامج تخصصية متنوعة</li>
        <li>أنشطة تعليمية واستراتيجيات تدريس خاصة</li>
        <li>بيئة تعلّم مستمرة</li>
        <li>تكريم وجوائز للطلاب والكوادر التعليمية</li>
        <li>مواهب متنوعة لدى طلاب المدرسة</li>
        <li>المدرسة محطّ زيارات وتصدير خبرات</li>
      </ul>
    </div>

    <div class="section glass">
      <h2><span class="orb"></span>من أنشطتنا</h2>
      <div class="gallery">${gallery}</div>
    </div>

    <p class="footer-note">ولا تزال المشاركات مستمرة ✨</p>
  </section>`;
};

/* Shared "under construction" page used by the orange, green and purple buttons */
function underConstruction(tileId) {
  const t = APP_CONFIG.tiles.find(x => x.id === tileId);
  const gear = `<svg class="gear" viewBox="0 0 100 100" aria-hidden="true">
    <defs><radialGradient id="g-${tileId}" cx="35%" cy="30%"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#e8f6ff"/><stop offset="1" stop-color="#9cc8e8"/></radialGradient></defs>
    <path fill="url(#g-${tileId})" stroke="rgba(255,255,255,.9)" stroke-width="1.5"
      d="M43 4h14l2 11 7 3 9-6 10 10-6 9 3 7 11 2v14l-11 2-3 7 6 9-10 10-9-6-7 3-2 11H43l-2-11-7-3-9 6-10-10 6-9-3-7-11-2V43l11-2 3-7-6-9 10-10 9 6 7-3zM50 34a16 16 0 1 0 0 32 16 16 0 1 0 0-32z"/></svg>`;
  return `
  <section class="page wip">
    <div class="wip-card ${t.color}">
      <img class="pic" src="${t.img}" alt="">
      <div class="wip-inner">
        <div>${gear}${gear.replace('class="gear"', 'class="gear small"')}</div>
        <h1>${t.title}</h1>
        <p>هذه الصفحة قيد الإنشاء 🚧 ترقّبوها قريبًا</p>
        <div class="progress glass"><span></span></div>
        <button class="glass-chip big-back" data-route="home">العودة للرئيسية</button>
      </div>
    </div>
  </section>`;
}
PAGES.robot = () => underConstruction("robot");
PAGES.teacher = () => underConstruction("teacher");
PAGES.visit = () => underConstruction("visit");
