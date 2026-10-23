       let state = {
            lang: 'ar',
            user: { 
                isLoggedIn: false, name: '', wallet: 0, myCourses: [], 
                completedHW: {}, finishedLectures: {}, passedExams: {}, quizScores: {},
                watchHistory: [], hwGrades: {}, solutionUnlocked: {},
                activity: [], joinedCommunity: false
            },
            currentCourseId: null, currentLectureIndex: 1, 
            chartInstances: {}, exam: { questions: [], answers: {}, current: 0, courseId: null },
            payMethod: null, currentLectureTab: "video"
        };

        const motivations = {
            ar: [
                "💡 كل نجاح بيبدأ من فكرة... استمر!",
                "🚀 التعلم استثمار في نفسك، متوقفش!",
                "🔥 أنت أقرب للنجاح مما تتخيل!",
                "💪 كل محاضرة بتخلّيك أقوى!",
                "⭐ المثابرة سر التفوق، كمل!",
                "🎯 ركّز على التقدم مش الكمال!",
                "📚 المعرفة قوة، زوّد رصيدك!",
                "🌟 اليوم خطوة، بكرة قفزة!",
                "🧠 عقلك عضلة... مرّنه كل يوم!",
                "🏆 الأبطال بيتدربوا لما غيرهم نايمين!",
                "✨ مش لازم تكون الأفضل، بس لازم تبدأ!",
                "🎓 الشهادة حلوة، بس المهارة أحلى!",
                "💎 الصبر مفتاح الإتقان!",
                "🔑 كل خبير كان يوم مبتدئ!",
                "✨ الفشل درس، مش نهاية!",
                "⚡ دقيقة دلوقتي = ساعة بكرة!",
                "🛡️ الانضباط بيكسب الموهبة!",
                "🌱 ازرع عادة، تحصد شخصية!",
                "📈 تقدّم بسيط كل يوم بيغيّر حياتك!",
                "🔥 الشغف وقود، والانضباط محرك!",
                "💫 أنت قادر على أكتر مما تظن!",
                "🧭 الطريق طويل، بس كل خطوة بتقرّبك!",
                "🎁 أعظم استثمار: نفسك!",
                "🙌 متقارنش نفسك بغيرك، قارن بنفسك امبارح!"
            ],
            en: [
                "💡 Every success starts with an idea... keep going!",
                "🚀 Learning is an investment in yourself!",
                "🔥 You're closer to success than you think!",
                "💪 Every lecture makes you stronger!",
                "⭐ Persistence is the secret... continue!",
                "🎯 Focus on progress, not perfection!",
                "📚 Knowledge is power, increase yours!",
                "🌟 A step today, a leap tomorrow!",
                "🧠 Your mind is a muscle... train it daily!",
                "🏆 Champions train while others sleep!",
                "✨ You don't need to be the best, just start!",
                "🎓 Certificates are nice, skills are better!",
                "💎 Patience is the key to mastery!",
                "🔑 Every expert was once a beginner!",
                "✨ Failure is a lesson, not the end!",
                "⚡ A minute now = an hour later!",
                "🛡️ Discipline beats talent!",
                "🌱 Plant a habit, harvest a character!",
                "📈 Small daily progress changes your life!",
                "🔥 Passion is fuel, discipline is the engine!",
                "💫 You're capable of more than you think!",
                "🧭 The road is long, every step gets you closer!",
                "🎁 The greatest investment: yourself!",
                "🙌 Don't compare to others, compare to yesterday!"
            ]
        };
        let motivIndex = 0;

        function cycleMotivation() {
            const box = document.getElementById('motivation-box');
            const el = document.getElementById('motivation-text');
            if (!el) return;
            // Nice border flash
            if (box) {
                box.classList.add('flash-border');
                setTimeout(() => box.classList.remove('flash-border'), 600);
            }
            el.classList.add('fade-out');
            setTimeout(() => {
                motivIndex = (motivIndex + 1) % motivations[state.lang].length;
                el.textContent = motivations[state.lang][motivIndex];
                el.classList.remove('fade-out');
                el.classList.add('fade-in');
                setTimeout(() => el.classList.remove('fade-in'), 250);
            }, 200);
        }
        // Auto-cycle every 12s as well
        setInterval(() => { cycleMotivation(); }, 3600000); // كل ساعة

        const db = {
            courses: [
                { id: 'c_html', name: 'HTML5 Course', desc: 'أساسيات بناء هيكل الويب', price: 150, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
                { id: 'c_css', name: 'CSS3 Master', desc: 'تنسيق وتصميم واجهات احترافية', price: 200, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
                { id: 'c_js', name: 'JavaScript PRO', desc: 'برمجة التفاعلات المتقدمة', price: 300, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' }
            ],
            assignments: [
                { id: 'hw_html', title: 'تمرين HTML - بناء صفحة شخصية', q1: 'أنشئ عنوان و 3 فقرات.', q2: 'أضف صورة برابط خارجي.', maxGrade: 10 },
                { id: 'hw_css', title: 'تمرين CSS - تصميم الألوان', q1: 'غير لون الخلفية إلى رمادي.', q2: 'اجعل الخط بحجم 20 بكسل عريض.', maxGrade: 10 }
            ]
        };

        const i18n = {
            ar: {
                pageTitle: "منصة FIKRA - لوحة الطالب", platformName: "FIKRA", platformNameHeader: "FIKRA PLATFORM",
                dashboard: "لوحة التحكم", myCourses: "كورساتي", suggested: "كورسات مقترحة",
                pdfLibrary: "مكتبة الكتب", records: "السجل", stats: "احصائياتي", community: "مجتمع فكرة",
                themeCustomizer: "تخصيص الواجهة", studentLoginBtn: "تسجيل دخول", studentLogin: "تسجيل الدخول",
                welcomeMsg: "أهلاً بك في منصة فكرة!", welcomeSub: "مرحباً بك", welcomeSubLong: "كل نجاح بيبدأ من فكرة. استكشف كورساتنا وابدأ رحلة التعلم.",
                quickLinks: "اختصارات سريعة", wallet: "المحفظة", activityLog: "سجل النشاطات", emptyState: "حالياً فارغ - سيتم إضافة المحتوى قريباً",
                footerText: "Dev by Fikra Team | كل نجاح بيبدأ من فكرة | جميع الحقوق محفوظة 2026",
                currency: "EGP", testCharge: "شحن تجريبي سريع (500 EGP)", rechargeBtn: "شحن المحفظة", selectPaymentMethod: "اختر طريقة الدفع:",
                vodafoneCash: "فودافون كاش", fawry: "فوري", chargeAmount: "المبلغ المراد شحنه",
                colorPrimary: "اللون الأساسي", colorSelection: "لون التحديد", colorBg: "لون الخلفية", colorSidebar: "لون الكروت",
                colorText: "لون النصوص", saveChanges: "حفظ التغييرات", cancel: "إلغاء", cancelEx: "ليس الآن", loginBtn: "دخول",
                registerBtn: "تسجيل", noAccount: "ليس لدي حساب؟ أنشئ حساباً جديداً", register: "إنشاء حساب جديد",
                studentLevel: "المرحلة الدراسية", levelUniv: "طالب جامعي", levelHigh: "طالب ثانوي", levelMiddle: "طالب إعدادي", 
                year1: "سنة أولى", year2: "سنة ثانية", year3: "سنة ثالثة", year4: "سنة رابعة", facultyPlace: "اسم الكلية",
                parentPhonePlace: "رقم ولي الأمر (إجباري)", usernamePh: "اسم المستخدم", contactPh: "رقم الموبايل أو الإيميل",
                passwordPh: "كلمة المرور", buyBtn: "شراء", enrolled: "ممتلك", backToMyCourses: "العودة لكورساتي", backToLectures: "العودة للمحاضرات",
                tabVideo: "فيديو الشرح", tabSummary: "الملخص", tabHW: "الواجب", tabSolution: "حل الواجب", finishVideo: "إنهاء المحاضرة", nextLecture: "التالي",
                dummyHWTitle: "واجب تطبيقي", hwInstruction: "يمكنك رفع صورة للحل أو البدء في الحل الإلكتروني.", submitHWBtn: "تسليم إلكتروني",
                uploadHwPic: "رفع صورة للحل", summaryPlaceholder: "محتوى الملخص سيظهر هنا...", hwDownload: "تنزيل (PDF)", hwSubmit: "تسليم", hwDone: "تم التسليم",
                loginReq: "يجب تسجيل الدخول أولاً!", noMoney: "الرصيد غير كافٍ! اشحن محفظتك.", successBuy: "تم الشراء بنجاح!", addLog: "تم شحن",
                subLog: "تم تسليم واجب الدروس بنجاح", openLecLog: "فتحت محاضرة", logout: "تسجيل الخروج",
                watchHistory: "سجل المشاهدة", examsHistory: "سجل الاختبارات", hwsHistory: "سجل الواجبات (الدرجات)",
                finalExamTitle: "اختبار إتمام الدورة", finalExamSub: "اجتز هذا الاختبار لتحصل على شهادة الإتمام وإثبات مهارتك.",
                startExam: "ابدأ الاختبار", startExamBtn: "ابدأ", examDesc: "هل أنت مستعد لاختبار معلوماتك والحصول على الشهادة؟",
                examPassed: "مبروك! لقد اجتزت الاختبار بنجاح.", joinComm: "انضمام", postBtn: "نشر", selectPaymentError: "يرجى اختيار طريقة الدفع أولاً!",
                commPlaceholder: "بم تفكر؟ شارك سؤالك أو فكرتك...", defaultStudent: "أيها الطالب",
                chartAttended: "دروس حضرتها", chartUnattended: "دروس لم تحضرها", chartSub: "واجبات مسلمة", chartUnsub: "واجبات معلقة"
            },
            en: {
                pageTitle: "FIKRA - Student Dashboard", platformName: "FIKRA", platformNameHeader: "FIKRA PLATFORM",
                dashboard: "Dashboard", myCourses: "My Courses", suggested: "Suggested Courses",
                pdfLibrary: "Library", records: "Records", stats: "My Stats", community: "Fikra Community",
                themeCustomizer: "Theme Customizer", studentLoginBtn: "Login", studentLogin: "Sign In",
                welcomeMsg: "Welcome to FIKRA!", welcomeSub: "Welcome,", welcomeSubLong: "Every success starts with an idea. Explore and learn.",
                quickLinks: "Quick Links", wallet: "Wallet", activityLog: "Activity Log", emptyState: "Currently Empty - Content coming soon",
                footerText: "Dev by Fikra Team | Every success begins with an idea | All rights reserved 2026",
                currency: "EGP", testCharge: "Quick Charge (500 EGP)", rechargeBtn: "Recharge", selectPaymentMethod: "Select Payment Method:",
                vodafoneCash: "Vodafone Cash", fawry: "Fawry", chargeAmount: "Amount to recharge",
                colorPrimary: "Primary Color", colorSelection: "Selection Color", colorBg: "Background Color", colorSidebar: "Cards Color",
                colorText: "Text Color", saveChanges: "Save Changes", cancel: "Cancel", cancelEx: "Not Now", loginBtn: "Login",
                registerBtn: "Register", noAccount: "Don't have an account? Create one.", register: "Create Account",
                studentLevel: "Study Level", levelUniv: "University", levelHigh: "High School", levelMiddle: "Middle School", 
                year1: "1st Year", year2: "2nd Year", year3: "3rd Year", year4: "4th Year", facultyPlace: "Faculty Name",
                parentPhonePlace: "Parent Phone (Required)", usernamePh: "Username", contactPh: "Email or Phone",
                passwordPh: "Password", buyBtn: "Buy", enrolled: "Owned", backToMyCourses: "Back to My Courses", backToLectures: "Back to Lectures",
                tabVideo: "Video", tabSummary: "Summary", tabHW: "Homework", tabSolution: "Solution", finishVideo: "Finish", nextLecture: "Next",
                dummyHWTitle: "Practice Assignment", hwInstruction: "Upload a picture or submit online.", submitHWBtn: "Submit Online",
                uploadHwPic: "Upload Image", summaryPlaceholder: "Summary content will appear here...", hwDownload: "Download (PDF)", hwSubmit: "Submit", hwDone: "Submitted",
                loginReq: "Please login first!", noMoney: "Insufficient balance! Please recharge.", successBuy: "Purchased successfully!", addLog: "Recharged",
                subLog: "Successfully submitted assignment", openLecLog: "Opened Lecture", logout: "Logout",
                watchHistory: "Watch History", examsHistory: "Exams History", hwsHistory: "HW History (Grades)",
                finalExamTitle: "Course Final Exam", finalExamSub: "Pass this exam to get your completion certificate.",
                startExam: "Start Exam", startExamBtn: "Start", examDesc: "Are you ready to test your knowledge?",
                examPassed: "Congratulations! You passed the exam.", joinComm: "Join", postBtn: "Post", selectPaymentError: "Please select a payment method!",
                commPlaceholder: "What's on your mind? Share it...", defaultStudent: "Student",
                chartAttended: "Attended Lessons", chartUnattended: "Unattended", chartSub: "Submitted HW", chartUnsub: "Pending HW"
            }
        };

        document.addEventListener('DOMContentLoaded', () => { 
            renderSuggested(); renderAssignments(); updateWalletUI(); handleLevelChange(); renderActivity();
            // On desktop, never use mobile-closed
            if (window.innerWidth >= 1024) {
                document.getElementById('sidebar').classList.remove('mobile-closed');
            }
            // Handle resize
            window.addEventListener('resize', () => {
                const sb = document.getElementById('sidebar');
                const overlay = document.getElementById('sidebar-overlay');
                if (window.innerWidth >= 1024) {
                    sb.classList.remove('mobile-closed');
                    if (overlay) overlay.classList.remove('active');
                } else {
                    // keep closed by default on mobile after resize to desktop->mobile
                    if (!sb.classList.contains('mobile-closed')) {
                        // leave as is if user had it open
                    }
                }
            });
        });

        function showToast(keyOrText, isError = false) {
            const t = document.getElementById('toast');
            document.getElementById('toast-message').innerText = i18n[state.lang][keyOrText] || keyOrText;
            t.className = `fixed top-4 start-1/2 -translate-x-1/2 text-white px-6 py-3 rounded-full shadow-lg opacity-100 transition-all duration-300 z-[100] flex items-center gap-3 transform translate-y-0 ${isError ? 'bg-red-500' : 'bg-customPrimary'}`;
            document.getElementById('toast-icon').className = isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
            setTimeout(() => t.classList.replace('opacity-100', 'opacity-0'), 3000);
        }

        function switchView(id, navEl = null) {
            document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            if(navEl) { clearNavActive(); navEl.classList.add('active'); }
            if(window.innerWidth < 1024) closeMobileSidebar();
            const scrollArea = document.getElementById('main-scroll-area');
            if (scrollArea) scrollArea.scrollTo(0,0);
            if(id === 'stats-view') renderStats();
            if(id === 'community-view') { if(typeof updateCommunityLock==='function') updateCommunityLock(); }
            if(id === 'records-view') { renderWatchHistory(); }
        }
        function clearNavActive() { document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active')); }
        function goToDashboard() {
            switchView('dashboard-view', document.getElementById('nav-dashboard'));
            if (window.innerWidth < 1024) closeMobileSidebar();
        }

        function toggleSidebarSize() {
            const sb = document.getElementById('sidebar');
            if(window.innerWidth >= 1024) { 
                sb.classList.toggle('collapsed');
                sb.classList.toggle('w-64');
                sb.classList.toggle('w-20');
            } else { 
                toggleMobileSidebar(); 
            }
        }
        function toggleMobileSidebar() {
            const sb = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            if (!sb) return;
            const isClosed = sb.classList.contains('mobile-closed');
            if (isClosed) {
                sb.classList.remove('mobile-closed');
                if (overlay) overlay.classList.add('active');
            } else {
                sb.classList.add('mobile-closed');
                if (overlay) overlay.classList.remove('active');
            }
        }
        function closeMobileSidebar() {
            const sb = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            if (sb) sb.classList.add('mobile-closed');
            if (overlay) overlay.classList.remove('active');
        }
        function openMobileSidebar() {
            const sb = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            if (sb) sb.classList.remove('mobile-closed');
            if (overlay) overlay.classList.add('active');
        }

        function openModal(id) { document.getElementById(id).classList.remove('opacity-0', 'pointer-events-none'); }
        function closeModal(id) { document.getElementById(id).classList.add('opacity-0', 'pointer-events-none'); }

        function updateThemeVar(name, val) { document.documentElement.style.setProperty(name, val); }
        function openCustomizer() { openModal('customizer-modal'); }

        function toggleLanguage() {
            state.lang = state.lang === 'ar' ? 'en' : 'ar';
            const html = document.documentElement;
            html.setAttribute('dir', state.lang === 'ar' ? 'rtl' : 'ltr'); html.setAttribute('lang', state.lang);
            document.getElementById('lang-text').innerText = state.lang === 'ar' ? 'EN' : 'عربي';
            
            document.querySelectorAll('[data-i18n]').forEach(el => el.innerText = i18n[state.lang][el.getAttribute('data-i18n')] || el.innerText);
            document.querySelectorAll('[data-i18n-ph]').forEach(el => el.placeholder = i18n[state.lang][el.getAttribute('data-i18n-ph')] || el.placeholder);
            
            handleLevelChange(); renderSuggested(); renderMyCourses(); renderAssignments(); renderActivity(); updateWalletUI();
            const motEl = document.getElementById('motivation-text');
            if (motEl) motEl.textContent = motivations[state.lang][motivIndex];
            if(state.user.isLoggedIn) {
                const displayName = state.user.name || i18n[state.lang].defaultStudent;
                document.getElementById('user-btn-text').innerText = displayName;
                document.getElementById('dropdown-name').innerText = displayName;
                document.getElementById('welcome-title').innerText = `${i18n[state.lang].welcomeSub} ${displayName}`;
            }
            if(state.chartInstance) renderStats();
        }

        function handleLevelChange() {
            const val = document.getElementById('reg-level').value;
            const container = document.getElementById('dynamic-fields');
            const yrOpts = [1,2,3].map(i => `<option class="bg-customCard text-customText" value="${i}">${i18n[state.lang]['year'+i]}</option>`).join('');
            const yr4 = val === 'univ' ? `<option class="bg-customCard text-customText" value="4">${i18n[state.lang]['year4']}</option>` : '';
            
            container.innerHTML = `
                <select class="w-full bg-customCard text-customText border border-slate-200/20 rounded-xl p-3 outline-none mb-4 font-bold">
                    ${yrOpts}${yr4}
                </select>
                <input type="text" class="w-full bg-black/5 dark:bg-white/5 border border-slate-200/20 rounded-xl p-3" placeholder="${val === 'univ' ? i18n[state.lang].facultyPlace : i18n[state.lang].parentPhonePlace}">
            `;
        }

        function toggleUserMenu() {
            if(!state.user.isLoggedIn) openModal('login-modal');
            else document.getElementById('user-dropdown').classList.toggle('hidden');
        }
        function closeUserMenu() { document.getElementById('user-dropdown').classList.add('hidden'); }
        function openRegister() { closeModal('login-modal'); setTimeout(() => openModal('reg-modal'), 300); }

        function performAuth(type) {
            let name = document.getElementById(type === 'login' ? 'login-user' : 'reg-user').value.trim();
            state.user.name = name || ''; // empty implies generic
            state.user.isLoggedIn = true;
            
            const displayName = state.user.name || i18n[state.lang].defaultStudent;
            document.getElementById('user-btn-text').innerText = displayName;
            document.getElementById('dropdown-name').innerText = displayName;
            document.getElementById('welcome-title').innerText = `${i18n[state.lang].welcomeSub} ${displayName}`;
            
            closeModal(type === 'login' ? 'login-modal' : 'reg-modal');
            showToast(state.lang === 'ar' ? 'تم الدخول بنجاح!' : 'Logged in!');
        }

        function performLogout() {
            state.user.isLoggedIn = false;
            document.getElementById('user-btn-text').innerText = i18n[state.lang].studentLoginBtn;
            closeUserMenu(); showToast(state.lang === 'ar' ? 'تم تسجيل الخروج' : 'Logged out'); goToDashboard();
        }

        function updateWalletUI() {
            document.getElementById('wallet-balance').innerText = `${state.user.wallet} ${i18n[state.lang].currency}`;
            document.getElementById('wallet-large-balance').innerText = state.user.wallet;
        }
        function selectPayMethod(method) {
            state.payMethod = method;
            document.getElementById('vodafone-fields').classList.toggle('hidden', method !== 'vodafone');
            document.getElementById('fawry-fields').classList.toggle('hidden', method !== 'fawry');
            if (method === 'fawry') {
                document.getElementById('fawry-ref').textContent = '888-' + Math.floor(100 + Math.random()*900) + '-' + Math.floor(1000 + Math.random()*9000);
            }
        }
        function chargeWallet() {
            if (!state.payMethod) return showToast('selectPaymentError', true);
            if (state.payMethod === 'vodafone') {
                const phone = document.getElementById('vf-phone').value.trim();
                if (!/^01[0-9]{9}$/.test(phone)) return showToast(state.lang==='ar'?'أدخل رقم فودافون صحيح (11 رقم يبدأ بـ 01)':'Enter valid VF number', true);
            }
            const v = parseInt(document.getElementById('charge-input').value);
            if (v > 0) processCharge(v);
            else showToast(state.lang === 'ar' ? 'أدخل مبلغاً صحيحاً' : 'Enter a valid amount', true);
        }
        function testCharge() { processCharge(500); }
        function processCharge(amount) {
            if(!state.user.isLoggedIn) return showToast('loginReq', true);
            state.user.wallet += amount; updateWalletUI();
            logActivity(`${i18n[state.lang].addLog} ${amount} EGP`, 'fa-bolt', 'text-amber-500');
            showToast(state.lang === 'ar' ? 'تم الشحن بنجاح!' : 'Recharged successfully!'); 
            document.getElementById('charge-input').value = '';
        }
        function toggleSidebarCollapse() {
            if (window.innerWidth >= 1024) {
                const sb = document.getElementById('sidebar');
                if (!sb) return;
                sb.classList.toggle('collapsed');
                sb.classList.toggle('w-64');
                sb.classList.toggle('w-20');
            } else {
                toggleMobileSidebar();
            }
        }

        function renderSuggested() {
            const g = document.getElementById('suggested-grid'); g.innerHTML = '';
            db.courses.forEach(c => {
                const owned = state.user.myCourses.includes(c.id);
                const btnKey = owned ? 'enrolled' : 'buyBtn';
                const btnStyle = owned ? 'bg-black/10 cursor-not-allowed opacity-70' : 'bg-customPrimary hover:opacity-90 shadow-lg hover:-translate-y-1 transform transition-all';
                g.innerHTML += `
                    <div class="bg-customCard p-5 rounded-2xl border border-slate-200/20 shadow-sm flex flex-col justify-between text-center relative overflow-hidden group">
                        <div class="absolute inset-0 bg-gradient-to-b from-customPrimary/5 to-transparent"></div>
                        <img src="${c.logo}" class="w-16 h-16 mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform">
                        <h3 class="text-xl font-bold mb-1 relative z-10" dir="ltr">${c.name}</h3>
                        <p class="text-xs opacity-70 mb-4 relative z-10">${c.desc}</p>
                        <div class="flex items-center justify-between mt-auto relative z-10">
                            <span class="font-black text-lg text-customPrimary">${c.price} ${i18n[state.lang].currency}</span>
                            <button onclick="${owned ? '' : `buyCourse('${c.id}', ${c.price})`}" class="px-5 py-2 rounded-xl text-white font-bold text-sm ${btnStyle}">${i18n[state.lang][btnKey]}</button>
                        </div>
                    </div>`;
            });
        }

        function buyCourse(id, price) {
            if(!state.user.isLoggedIn) return showToast('loginReq', true);
            if(state.user.wallet < price) return showToast('noMoney', true);
            state.user.wallet -= price; state.user.myCourses.push(id);
            if (!state.user.finishedLectures[id]) state.user.finishedLectures[id] = [];
            updateWalletUI(); renderSuggested(); renderMyCourses();
            showToast('successBuy');
            logActivity((state.lang==='ar'?'اشتريت كورس ':'Bought course ') + (db.courses.find(c=>c.id===id)?.name||id), 'fa-shopping-cart', 'text-green-500');
        }

        function renderMyCourses() {
            const g = document.getElementById('my-courses-grid'); const e = document.getElementById('my-courses-empty');
            if(state.user.myCourses.length === 0) { g.classList.add('hidden'); e.classList.remove('hidden'); return; }
            e.classList.add('hidden'); g.classList.remove('hidden'); g.innerHTML = '';
            state.user.myCourses.forEach(id => {
                const c = db.courses.find(x=>x.id===id);
                g.innerHTML += `
                    <div onclick="openCourse('${id}')" class="bg-customCard p-5 rounded-2xl border border-slate-200/20 shadow-sm cursor-pointer hover:border-customPrimary hover:shadow-lg transition-all group flex items-center gap-4">
                        <img src="${c.logo}" class="w-12 h-12 object-contain group-hover:scale-110 transition-transform">
                        <div><h3 class="font-bold text-lg" dir="ltr">${c.name}</h3><p class="text-xs text-customPrimary font-bold opacity-80 mt-1">ابدأ التعلم <i class="fas fa-play text-[10px]"></i></p></div>
                    </div>`;
            });
        }

        // Homework questions per course lecture (2 questions)
        const lectureHW = {
            c_html: {
                1: [
                    { q: 'عايزين نكتب أكبر عنوان ظاهر جوه صفحة الويب. أنهي وسم HTML نستخدم؟', opts: ['h6 — عنوان صغير', 'h1 — أكبر عنوان', 'title — عنوان التبويب فقط', 'header — منطقة رأس الصفحة'], c: 1 },
                    { q: 'وسم title بيظهر في تبويب المتصفح. المفروض نحطه فين في الكود؟', opts: ['جوه body', 'جوه head', 'بعد إغلاق html', 'قبل DOCTYPE'], c: 1 }
                ],
                2: [
                    { q: 'عايزين نحدد جزء من الصفحة كمحتوى مستقل (زي مقال). أنهي وسم دلالي؟', opts: ['div — حاوية عادية', 'span — نص مضمّن', 'article — محتوى مستقل', 'p — فقرة فقط'], c: 2 },
                    { q: 'عايزين نعمل شريط روابط للتنقل بين صفحات الموقع. أنهي وسم؟', opts: ['menu', 'nav', 'links', 'ul لوحده من غير nav'], c: 1 }
                ],
                3: [
                    { q: 'في فورم تسجيل مستخدم، حقل الإيميل المفروض type بتاعه يكون إيه؟', opts: ['text', 'email', 'mail', 'string'], c: 1 },
                    { q: 'عايزين نعرض صورة من رابط على الصفحة. أنهي وسم؟', opts: ['image', 'img', 'pic', 'photo'], c: 1 }
                ]
            },
            c_css: {
                1: [
                    { q: 'عنصر عليه class اسمه card. إزاي نحدده صح في ملف CSS؟', opts: ['#card', '.card', 'card', '*card'], c: 1 },
                    { q: 'عايزين نخلي لون الكتابة أزرق. أنهي خاصية CSS؟', opts: ['font-color', 'text-color', 'color', 'fg-color'], c: 2 }
                ],
                2: [
                    { q: 'عايزين مسافة جوّه العنصر (بين المحتوى والحد). نستخدم أنهي خاصية؟', opts: ['margin', 'padding', 'border', 'gap'], c: 1 },
                    { q: 'عايزين مسافة برّه العنصر تفصله عن العناصر اللي حواليه. نستخدم؟', opts: ['padding', 'margin', 'outline', 'width'], c: 1 }
                ],
                3: [
                    { q: 'لما نكتب display: flex العناصر بتتوزع إزاي افتراضيًا؟', opts: ['عمودي تحت بعض', 'في صف أفقي', 'بتختفي', 'فوق بعض بشكل مطلق'], c: 1 },
                    { q: 'عايزين نوزّع عناصر الـ Flex أفقيًا (يمين وشمال). نستخدم؟', opts: ['align-items', 'justify-content', 'flex-direction', 'order'], c: 1 }
                ]
            },
            c_js: {
                1: [
                    { q: 'عايزين متغير قيمته ثابتة ومش هتتغير بعد التعريف. نستخدم؟', opts: ['var', 'let', 'const', 'static'], c: 2 },
                    { q: 'لو كتبنا typeof "مرحبا" في JavaScript، النتيجة هتبقى؟', opts: ['text', 'string', 'str', 'char'], c: 1 }
                ],
                2: [
                    { q: 'عايزين نمسك عنصر الـ id بتاعه btn من الصفحة. أنهي طريقة؟', opts: ['querySelector فقط', 'getElementById("btn")', 'getById("btn")', 'find("btn")'], c: 1 },
                    { q: 'عايزين ننفّذ كود لما المستخدم يدوس على زرار. نستخدم؟', opts: ['setStyle()', 'addEventListener("click", ...)', 'createElement()', 'remove()'], c: 1 }
                ],
                3: [
                    { q: 'عندنا مصفوفة names وعايزين نضيف اسم في آخرها. نستخدم؟', opts: ['names.add("Ali")', 'names.push("Ali")', 'names.append("Ali")', 'names.insert("Ali")'], c: 1 },
                    { q: 'إيه الفرق الصحيح بين == و === في JavaScript؟', opts: ['مفيش فرق خالص', '=== يقارن القيمة ونوع البيانات', '== أسرع بس', '=== للنصوص فقط'], c: 1 }
                ]
            }
        };

        function hwKey() { return state.currentCourseId + '_lec' + state.currentLectureIndex; }

        function openCourse(id) {
            state.currentCourseId = id;
            const c = db.courses.find(x => x.id === id);
            document.getElementById('detail-course-title').innerText = c.name;
            document.getElementById('detail-course-img').src = c.logo;
            const finished = state.user.finishedLectures[id] || [];
            let list = '';
            for (let i = 1; i <= 3; i++) {
                const isDone = finished.includes(i);
                list += `
                    <div onclick="startLec(${i})" class="flex items-center justify-between p-4 rounded-xl border border-slate-200/20 bg-black/5 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer transition-colors">
                        <div class="flex items-center gap-3 font-bold">
                            <div class="w-8 h-8 rounded ${isDone ? 'bg-green-500 text-white' : 'bg-customPrimary/20 text-customPrimary'} flex items-center justify-center">
                                ${isDone ? '<i class="fas fa-check text-sm"></i>' : i}
                            </div>
                            <span dir="ltr">Lecture ${i}</span>
                        </div>
                        <i class="fas ${isDone ? 'fa-check-circle text-green-500' : 'fa-play text-customPrimary/50'}"></i>
                    </div>`;
            }
            document.getElementById('lectures-list').innerHTML = list;
            switchView('course-details-view');
        }

        const lectureTabOrder = ['video', 'summary', 'hw', 'solution'];

        function startLec(index) {
            state.currentLectureIndex = index;
            state.currentLectureTab = 'video';
            document.getElementById('current-lecture-title').innerText = `Lecture ${index}`;
            logActivity(`${i18n[state.lang].openLecLog} ${index}`, 'fa-play-circle', 'text-customPrimary');
            // لا نسجل المشاهدة هنا — فقط عند الضغط على «التالي»
            resetHWUI();
            updateSolutionLock();
            switchView('lecture-view');
            switchLectureTab('video', true);
            updateLectureNavButtons();
        }
        function backToCourseDetails() { openCourse(state.currentCourseId); }

        // «التالي» ينقل بالترتيب: فيديو → ملخص → واجب → حل
        function nextLecture() {
            const tab = state.currentLectureTab || 'video';
            const idx = lectureTabOrder.indexOf(tab);

            // من الفيديو إلى الملخص = تسجيل مشاهدة
            if (tab === 'video') {
                registerWatchHistory();
                switchLectureTab('summary', true);
                updateLectureNavButtons();
                return;
            }
            if (tab === 'summary') {
                switchLectureTab('hw', true);
                updateLectureNavButtons();
                return;
            }
            if (tab === 'hw') {
                const key = hwKey();
                if (state.user.hwGrades[key] == null) {
                    showToast(state.lang === 'ar' ? 'سلّم الواجب أولاً قبل الانتقال لحل الواجب' : 'Submit the homework first', true);
                    return;
                }
                switchLectureTab('solution', true);
                updateLectureNavButtons();
                return;
            }
            if (tab === 'solution') {
                // بعد الحل: إنهاء المحاضرة (لو الواجب متسلم)
                finishLecture();
                return;
            }
        }

        function registerWatchHistory() {
            const cname = db.courses.find(c => c.id === state.currentCourseId)?.name || '';
            const lec = state.currentLectureIndex;
            // تجنب التكرار لنفس المحاضرة في نفس الجلسة
            const exists = (state.user.watchHistory || []).some(w => w.course === cname && w.lecture === lec);
            if (!exists) {
                state.user.watchHistory.unshift({ course: cname, lecture: lec, t: new Date().toLocaleString() });
                if (state.user.watchHistory.length > 30) state.user.watchHistory.pop();
            }
        }

        function finishLecture() {
            if (!state.user.isLoggedIn) return showToast('loginReq', true);
            const key = hwKey();
            if (state.user.hwGrades[key] == null) {
                showToast(state.lang === 'ar' ? 'لازم تسلّم الواجب قبل إنهاء المحاضرة' : 'You must submit the homework before finishing', true);
                switchLectureTab('hw', true);
                updateLectureNavButtons();
                return;
            }
            const cid = state.currentCourseId;
            if (!state.user.finishedLectures[cid]) state.user.finishedLectures[cid] = [];
            if (!state.user.finishedLectures[cid].includes(state.currentLectureIndex)) {
                state.user.finishedLectures[cid].push(state.currentLectureIndex);
            }
            showToast(state.lang === 'ar' ? 'تم إنهاء المحاضرة ✓' : 'Lecture Finished ✓');
            openCourse(cid);
        }

        function updateLectureNavButtons() {
            const tab = state.currentLectureTab || 'video';
            const nextBtn = document.querySelector('#lecture-view button[onclick="nextLecture()"]');
            if (nextBtn) {
                const label = nextBtn.querySelector('span');
                if (tab === 'solution') {
                    if (label) label.textContent = state.lang === 'ar' ? 'إنهاء والرجوع' : 'Finish & Back';
                } else if (tab === 'hw') {
                    if (label) label.textContent = state.lang === 'ar' ? 'التالي (حل الواجب)' : 'Next (Solution)';
                } else if (tab === 'summary') {
                    if (label) label.textContent = state.lang === 'ar' ? 'التالي (الواجب)' : 'Next (Homework)';
                } else {
                    if (label) label.textContent = state.lang === 'ar' ? 'التالي (الملخص)' : 'Next (Summary)';
                }
            }
        }

        function switchLectureTab(id, fromNext = false) {
            // منع تخطي الترتيب يدويًا لحل الواجب
            if (id === 'solution') {
                const key = hwKey();
                if (!state.user.solutionUnlocked[key]) {
                    showToast(state.lang === 'ar' ? 'سلّم الواجب أولاً لفتح الحل' : 'Submit HW first to unlock solution', true);
                    return;
                }
            }
            state.currentLectureTab = id;
            document.querySelectorAll('#lecture-view .interactive-card').forEach(c => {
                c.classList.remove('active-tab', 'border-customPrimary');
                c.classList.add('border-transparent');
            });
            document.querySelectorAll('#lecture-view .tab-content').forEach(c => {
                c.classList.add('hidden');
                c.classList.remove('flex');
            });
            const tb = document.getElementById('tab-' + id);
            if (tb) { tb.classList.add('active-tab'); tb.classList.replace('border-transparent', 'border-customPrimary'); }
            const ct = document.getElementById('content-' + id);
            if (ct) {
                ct.classList.remove('hidden');
                if (id === 'video' || id === 'summary' || id === 'solution') ct.classList.add('flex');
            }
            if (id === 'hw') prepareHWPreview();
            if (id === 'solution') updateSolutionLock();
            updateLectureNavButtons();
        }

        let hwState = { qs: [], idx: 0, answers: [] };

        function escapeHtml(str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }

        function prepareHWPreview() {
            const key = hwKey();
            if (state.user.hwGrades[key] != null) {
                document.getElementById('hw-intro').classList.add('hidden');
                document.getElementById('hw-solve').classList.add('hidden');
                document.getElementById('hw-result').classList.remove('hidden');
                document.getElementById('hw-result-score').textContent = state.user.hwGrades[key] + '/2';
            } else {
                resetHWUI();
            }
        }

        function resetHWUI() {
            const a = document.getElementById('hw-intro');
            const b = document.getElementById('hw-solve');
            const c = document.getElementById('hw-result');
            if (a) a.classList.remove('hidden');
            if (b) b.classList.add('hidden');
            if (c) c.classList.add('hidden');
            hwState = { qs: [], idx: 0, answers: [] };
        }

        function startHWSolve() {
            if (!state.user.isLoggedIn) return showToast('loginReq', true);
            const qs = lectureHW[state.currentCourseId]?.[state.currentLectureIndex] || [];
            if (!qs.length) return showToast(state.lang==='ar'?'لا توجد أسئلة':'No questions', true);
            hwState = { qs: qs, idx: 0, answers: new Array(qs.length).fill(null) };
            document.getElementById('hw-intro').classList.add('hidden');
            document.getElementById('hw-result').classList.add('hidden');
            document.getElementById('hw-solve').classList.remove('hidden');
            renderHWQuestion();
        }

        function renderHWQuestion() {
            const { qs, idx, answers } = hwState;
            const q = qs[idx];
            // progress pills
            const prog = document.getElementById('hw-progress');
            prog.innerHTML = qs.map((_, i) => {
                let cls = 'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ';
                if (i === idx) cls += 'bg-customPrimary text-white border-customPrimary scale-110';
                else if (answers[i] != null) cls += 'bg-green-500/20 text-green-500 border-green-500';
                else cls += 'bg-black/5 dark:bg-white/5 border-slate-300/30 opacity-70';
                return `<button type="button" onclick="hwGoToQ(${i})" class="${cls}">${i+1}</button>`;
            }).join('');

            document.getElementById('hw-q-counter').textContent =
                (state.lang==='ar' ? `السؤال ${idx+1} من ${qs.length}` : `Question ${idx+1} of ${qs.length}`);
            document.getElementById('hw-q-text').textContent = q.q;

            const opts = document.getElementById('hw-opts');
            opts.innerHTML = q.opts.map((o, oi) => {
                const selected = answers[idx] === oi;
                return `<label class="flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${selected ? 'border-customPrimary bg-customPrimary/10' : 'border-slate-200/20 hover:border-customPrimary/40 bg-customCard'}">
                    <input type="radio" name="hw_current" value="${oi}" ${selected?'checked':''} class="accent-customPrimary w-4 h-4 shrink-0" onchange="hwSelectOpt(${oi})">
                    <span class="text-sm md:text-base font-medium leading-relaxed">${escapeHtml(o)}</span>
                </label>`;
            }).join('');

            document.getElementById('hw-prev-btn').disabled = idx === 0;
            const nextBtn = document.getElementById('hw-next-btn');
            nextBtn.textContent = idx === qs.length - 1
                ? (state.lang==='ar' ? 'تسليم الإجابات' : 'Submit Answers')
                : (state.lang==='ar' ? 'التالي' : 'Next');
        }

        function hwSelectOpt(oi) {
            hwState.answers[hwState.idx] = oi;
            renderHWQuestion();
        }
        function hwGoToQ(i) {
            hwState.idx = i;
            renderHWQuestion();
        }
        function hwPrevQ() {
            if (hwState.idx > 0) { hwState.idx--; renderHWQuestion(); }
        }
        function hwNextQ() {
            if (hwState.answers[hwState.idx] == null) {
                return showToast(state.lang==='ar'?'اختار إجابة الأول':'Select an answer first', true);
            }
            if (hwState.idx < hwState.qs.length - 1) {
                hwState.idx++;
                renderHWQuestion();
            } else {
                gradeHW();
            }
        }

        function gradeHW() {
            const { qs, answers } = hwState;
            // require all answered
            if (answers.some(a => a == null)) {
                return showToast(state.lang==='ar'?'جاوب على كل الأسئلة':'Answer all questions', true);
            }
            let score = 0;
            qs.forEach((q, i) => { if (answers[i] === q.c) score++; });
            const key = hwKey();
            state.user.hwGrades[key] = score;
            state.user.completedHW[key] = true;
            state.user.solutionUnlocked[key] = true;
            document.getElementById('hw-solve').classList.add('hidden');
            document.getElementById('hw-result').classList.remove('hidden');
            document.getElementById('hw-result-score').textContent = score + '/' + qs.length;
            document.getElementById('hw-result-icon').textContent = score >= 1 ? '✅' : '📝';
            logActivity((state.lang==='ar'?'واجب':'HW') + ` Lecture ${state.currentLectureIndex}: ${score}/${qs.length}`, 'fa-tasks', 'text-amber-500');
            showToast(state.lang==='ar' ? `نتيجتك ${score}/${qs.length} — تم فتح الحل` : `Score ${score}/${qs.length} — solution unlocked`);
            updateSolutionLock();
            state.currentLectureTab = 'hw';
            updateLectureNavButtons();
        }

        function updateSolutionLock() {
            const key = hwKey();
            const unlocked = !!state.user.solutionUnlocked[key];
            const locked = document.getElementById('solution-locked');
            const video = document.getElementById('solution-video');
            if (locked) locked.classList.toggle('hidden', unlocked);
            if (video) video.classList.toggle('hidden', !unlocked);
        }

        function submitLectureHW() { startHWSolve(); }
        
        const finalExamQs = {
            c_html: [
                {q:'ما هو الـ DOCTYPE الصحيح لـ HTML5؟', opts:['<!DOCTYPE html5>','<!DOCTYPE HTML PUBLIC>','<!DOCTYPE html>','<html5>'], c:2},
                {q:'أي وسم لإنشاء قائمة غير مرتبة؟', opts:['<ol>','<ul>','<li>','<list>'], c:1},
                {q:'ما الخاصية التي تحدد مصدر الصورة؟', opts:['href','src','link','url'], c:1},
                {q:'أي وسم دلالي للمحتوى الرئيسي؟', opts:['<content>','<main>','<body>','<section>'], c:1},
                {q:'كيف نفتح رابط في تبويب جديد؟', opts:['target="_self"','target="_blank"','target="_new"','target="_tab"'], c:1},
                {q:'ما وسم إنشاء جدول؟', opts:['<table>','<grid>','<tab>','<tbl>'], c:0},
                {q:'أي input type للرقم؟', opts:['text','number','num','digit'], c:1},
                {q:'ما وسم التعليق في HTML؟', opts:['// comment','/* comment */','<!-- comment -->','# comment'], c:2},
                {q:'أي وسم لدمج خلايا الجدول أفقياً؟', opts:['rowspan','colspan','merge','span'], c:1},
                {q:'ما فائدة خاصية alt في الصورة؟', opts:['تغيير الحجم','نص بديل عند فشل التحميل','إضافة رابط','تلوين'], c:1}
            ],
            c_css: [
                {q:'كيف نحدد عنصراً بالـ class؟', opts:['#class','.class','class','*class'], c:1},
                {q:'ما الخاصية لجعل النص عريضاً؟', opts:['font-weight: bold','text-bold: true','font-style: bold','weight: bold'], c:0},
                {q:'display: none يفعل ماذا؟', opts:['يخفي ويحتفظ بالمساحة','يخفي ويزيل المساحة','شفافية 0','لا شيء'], c:1},
                {q:'ما وحدة القياس النسبية للخط؟', opts:['px','em','cm','pt'], c:1},
                {q:'Flexbox يُستخدم أساساً لـ؟', opts:['الرسوم','التخطيط أحادي البعد','الفيديو','الصوت'], c:1},
                {q:'ما الخاصية للمسافة خارج الحدود؟', opts:['padding','margin','border','spacing'], c:1},
                {q:'position: absolute بالنسبة لـ؟', opts:['الـ viewport','أقرب عنصر positioned','الـ body','لا شيء'], c:1},
                {q:'كيف نجعل عنصراً دائرياً؟', opts:['border-radius: 50%','circle: true','shape: round','round: 100%'], c:0},
                {q:'z-index يتحكم في؟', opts:['الشفافية','ترتيب الطبقات','الحجم','اللون'], c:1},
                {q:'أفضل ممارسة للاستجابة؟', opts:['صور ثابتة','Media Queries','جداول','إطارات'], c:1}
            ],
            c_js: [
                {q:'ما الفرق بين let و var؟', opts:['لا فرق','let لها block scope','var أحدث','let عامة فقط'], c:1},
                {q:'ما ناتج 2 + "2"؟', opts:['4','"22"','error','NaN'], c:1},
                {q:'كيف نحول نص لرقم؟', opts:['toNumber()','parseInt()','Number.parse()','int()'], c:1},
                {q:'ما هي الـ Arrow Function؟', opts:['function => {}','() => {}','arrow function()','=> function'], c:1},
                {q:'localStorage يخزن البيانات؟', opts:['في السيرفر','في المتصفح بشكل دائم','مؤقتاً فقط','في الكوكيز'], c:1},
                {q:'إضافة عنصر لأول مصفوفة؟', opts:['push','unshift','shift','pop'], c:1},
                {q:'Promise تُستخدم لـ؟', opts:['الحلقات','العمليات غير المتزامنة','الشرطيات','المصفوفات'], c:1},
                {q:'ما ناتج Boolean(0)؟', opts:['true','false','0','null'], c:1},
                {q:'كيف نوقف انتشار الحدث؟', opts:['stop()','event.stopPropagation()','prevent()','halt()'], c:1},
                {q:'JSON.stringify يفعل ماذا؟', opts:['يحول كائن لنص JSON','يحول نص لكائن','يطبع','يحذف'], c:0}
            ]
        };

        function openFinalExam() { 
            if (!state.user.isLoggedIn) return showToast('loginReq', true);
            const cid = state.currentCourseId;
            const qs = finalExamQs[cid];
            if (!qs) return showToast('No exam', true);
            state.exam = { questions: qs, answers: {}, current: 0, courseId: cid };
            document.getElementById('exam-course-name') && (document.getElementById('exam-course-name').textContent = db.courses.find(c=>c.id===cid)?.name || '');
            renderExamQ();
            openModal('exam-modal');
        }
        function renderExamQ() {
            const { questions, current, answers } = state.exam;
            const q = questions[current];
            const area = document.getElementById('exam-question-area');
            if (!area) return;
            area.innerHTML = `<div><p class="text-lg font-bold mb-6">${current+1}. ${q.q}</p><div class="space-y-3">${q.opts.map((o,i)=>`<div onclick="selectExamAns(${i})" class="exam-option flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200/30 ${answers[current]===i?'selected':''}"><div class="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${answers[current]===i?'bg-customPrimary text-white border-customPrimary':'border-slate-400'}">${String.fromCharCode(65+i)}</div><span class="font-medium">${o}</span></div>`).join('')}</div></div>`;
            const prog = document.getElementById('exam-progress');
            if (prog) prog.textContent = `${current+1} / ${questions.length}`;
            const bar = document.getElementById('exam-progress-bar');
            if (bar) bar.style.width = `${((current+1)/questions.length)*100}%`;
            const prevBtn = document.getElementById('exam-prev-btn');
            if (prevBtn) prevBtn.disabled = current === 0;
            const isLast = current === questions.length - 1;
            const nextBtn = document.getElementById('exam-next-btn');
            const subBtn = document.getElementById('exam-submit-btn');
            if (nextBtn) nextBtn.classList.toggle('hidden', isLast);
            if (subBtn) subBtn.classList.toggle('hidden', !isLast);
        }
        function selectExamAns(i) { state.exam.answers[state.exam.current] = i; renderExamQ(); }
        function prevExamQ() { if (state.exam.current > 0) { state.exam.current--; renderExamQ(); } }
        function nextExamQ() { if (state.exam.current < state.exam.questions.length-1) { state.exam.current++; renderExamQ(); } }
        function submitExam() {
            const { questions, answers, courseId } = state.exam;
            let score = 0;
            questions.forEach((q,i) => { if (answers[i] === q.c) score++; });
            state.user.passedExams[courseId] = score;
            closeModal('exam-modal');
            const passed = score >= 6;
            logActivity(`${state.lang==='ar'?'اختبار':'Exam'} ${score}/10`, 'fa-trophy', passed?'text-amber-500':'text-slate-400');
            showToast(passed ? (state.lang==='ar'?`مبروك! نجحت ${score}/10`:`Passed ${score}/10`) : (state.lang==='ar'?`حاول مرة أخرى ${score}/10`:`Try again ${score}/10`));
        }
        function finishExam() { submitExam(); }

        function switchRecordTab(id) {
            document.querySelectorAll('.rec-tab').forEach(t => { t.classList.remove('active-tab', 'opacity-100'); t.classList.add('opacity-60'); });
            document.querySelectorAll('.rec-content').forEach(c => c.classList.add('hidden'));
            const activeT = document.getElementById('rec-tab-' + id);
            if (activeT) { activeT.classList.add('active-tab', 'opacity-100'); activeT.classList.remove('opacity-60'); }
            const panel = document.getElementById('rec-content-' + id);
            if (panel) panel.classList.remove('hidden');
            if (id === 'watch') renderWatchHistory();
            if (id === 'exams') renderExamsHistory();
            if (id === 'hws') renderHWGrades();
        }

        
        function renderExamsHistory() {
            const list = document.getElementById('exams-history-list');
            if (!list) return;
            const exams = Object.entries(state.user.passedExams || {});
            const quizzes = Object.entries(state.user.quizScores || {});
            if (!exams.length && !quizzes.length) {
                list.innerHTML = `<div class="bg-customCard p-6 rounded-2xl border text-center opacity-70 font-bold">${i18n[state.lang].emptyState}</div>`;
                return;
            }
            let html2 = '';
            exams.forEach(([cid, score]) => {
                const c = db.courses.find(x => x.id === cid);
                const passed = score >= 6;
                html2 += `<div class="flex items-center justify-between p-4 bg-customCard rounded-xl border border-slate-200/20">
                    <div class="flex items-center gap-3">
                        <img src="${c?.logo||''}" class="w-10 h-10">
                        <div>
                            <p class="font-bold text-sm" dir="ltr">${c?.name||cid} — ${state.lang==='ar'?'اختبار الإتمام':'Final Exam'}</p>
                            <p class="text-xs opacity-60">${passed ? (state.lang==='ar'?'ناجح':'Passed') : (state.lang==='ar'?'راسب':'Failed')}</p>
                        </div>
                    </div>
                    <span class="font-black text-lg ${passed?'text-green-500':'text-red-400'}">${score}/10</span>
                </div>`;
            });
            quizzes.forEach(([key, score]) => {
                html2 += `<div class="flex items-center justify-between p-4 bg-customCard rounded-xl border border-slate-200/20">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center"><i class="fas fa-question"></i></div>
                        <div>
                            <p class="font-bold text-sm">${state.lang==='ar'?'اختبار سريع':'Quick Quiz'} ${key}</p>
                        </div>
                    </div>
                    <span class="font-black text-lg text-customPrimary">${score}</span>
                </div>`;
            });
            list.innerHTML = html2;
        }
function renderWatchHistory() {
            const list = document.getElementById('watch-history-list');
            if (!list) return;
            const items = state.user.watchHistory || [];
            if (!items.length) {
                list.innerHTML = `<div class="bg-customCard p-6 rounded-2xl border text-center opacity-70 font-bold">${i18n[state.lang].emptyState}</div>`;
                return;
            }
            list.innerHTML = items.map(w => `
                <div class="flex items-center justify-between p-4 bg-customCard rounded-xl border border-slate-200/20">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-customPrimary/20 text-customPrimary flex items-center justify-center"><i class="fas fa-play"></i></div>
                        <div>
                            <p class="font-bold text-sm" dir="ltr">${w.course} — Lecture ${w.lecture}</p>
                            <p class="text-xs opacity-50">${w.t}</p>
                        </div>
                    </div>
                    <span class="text-xs font-bold text-customPrimary">${state.lang==='ar'?'تمت المشاهدة':'Watched'}</span>
                </div>
            `).join('');
        }

        function renderHWGrades() {
            const list = document.getElementById('assignments-grid');
            if (!list) return;
            const grades = Object.entries(state.user.hwGrades || {});
            if (!grades.length) {
                list.innerHTML = `<div class="bg-customCard p-6 rounded-2xl border text-center opacity-70 font-bold">${i18n[state.lang].emptyState}</div>`;
                return;
            }
            list.innerHTML = grades.map(([key, score]) => {
                const parts = key.split('_lec');
                const cid = parts[0];
                const lec = parts[1] || '?';
                const cname = db.courses.find(c => c.id === cid)?.name || cid;
                return `<div class="flex items-center justify-between p-4 bg-customCard rounded-xl border border-slate-200/20">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center"><i class="fas fa-tasks"></i></div>
                        <div>
                            <p class="font-bold text-sm" dir="ltr">${cname} — Lecture ${lec}</p>
                            <p class="text-xs opacity-50">${state.lang==='ar'?'واجب المحاضرة':'Lecture HW'}</p>
                        </div>
                    </div>
                    <span class="font-black text-lg ${score>=1?'text-green-500':'text-red-400'}">${score}/2</span>
                </div>`;
            }).join('');
        }

        function renderAssignments() {
            const g = document.getElementById('assignments-grid'); g.innerHTML = '';
            db.assignments.forEach((hw) => {
                const done = state.user.completedHW[hw.id];
                g.innerHTML += `
                    <div class="bg-customCard p-6 rounded-2xl border border-slate-200/20 shadow-sm relative overflow-hidden">
                        ${done ? `<div class="absolute top-4 end-4 text-green-500 text-sm font-bold flex flex-col items-center"><i class="fas fa-check-circle text-2xl"></i><span>${hw.maxGrade}/${hw.maxGrade}</span></div>` : ''}
                        <h3 class="font-bold text-lg mb-4 text-customPrimary">${hw.title}</h3>
                        <ul class="list-disc list-inside text-sm mb-6 opacity-70 space-y-1"><li>${hw.q1}</li><li>${hw.q2}</li></ul>
                        <div class="flex gap-3">
                            <button class="flex-1 bg-black/5 dark:bg-white/5 py-2 rounded-lg font-bold text-sm hover:bg-black/10"><i class="fas fa-download"></i> ${i18n[state.lang].hwDownload}</button>
                            <button onclick="submitGenHW('${hw.id}')" class="flex-1 ${done?'bg-green-500 text-white cursor-default':'bg-customPrimary hover:opacity-90 text-white'} py-2 rounded-lg font-bold text-sm shadow-sm transition-colors">
                                <i class="fas fa-${done?'check':'upload'}"></i> ${done ? i18n[state.lang].hwDone : i18n[state.lang].hwSubmit}
                            </button>
                        </div>
                    </div>`;
            });
        }
        function submitGenHW(id) {
            if(!state.user.isLoggedIn) return showToast('loginReq', true);
            if(state.user.completedHW[id]) return;
            state.user.completedHW[id] = true; logActivity(`${i18n[state.lang].subLog}`, 'fa-tasks', 'text-blue-500');
            showToast(state.lang==='ar'?'تم التسليم!':'Submitted!'); renderAssignments();
        }

        function logActivity(text, icon, color) {
            const t = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
            state.user.activity.unshift({ text, icon, color, t });
            if(state.user.activity.length > 8) state.user.activity.pop();
            renderActivity();
        }
        function renderActivity() {
            const c = document.getElementById('activity-list');
            if(state.user.activity.length===0) { c.innerHTML = `<div class="text-center opacity-50 mt-10 text-sm" data-i18n="emptyState">${i18n[state.lang].emptyState}</div>`; return; }
            c.innerHTML = state.user.activity.map(a => `
                <div class="flex items-start gap-3 p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-slate-200/10">
                    <div class="w-8 h-8 rounded-full bg-customCard flex items-center justify-center shrink-0"><i class="fas ${a.icon} ${a.color}"></i></div>
                    <div><p class="text-sm font-bold">${a.text}</p><span class="text-xs opacity-50">${a.t}</span></div>
                </div>
            `).join('');
        }

        function renderStats() {
            Object.values(state.chartInstances || {}).forEach(c => { try { c.destroy(); } catch(e){} });
            state.chartInstances = {};
            const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim() || '#f8fafc';
            const totalPossibleLec = Math.max(1, state.user.myCourses.length * 3);
            let finishedLec = 0;
            Object.values(state.user.finishedLectures || {}).forEach(arr => finishedLec += arr.length);
            const remainingLec = Math.max(0, totalPossibleLec - finishedLec);
            const doneHW = Object.keys(state.user.completedHW || {}).length;
            const pendingHW = Math.max(0, 5 - doneHW);
            const passedEx = Object.values(state.user.passedExams || {}).filter(s => s >= 6).length;
            const totalEx = Math.max(1, state.user.myCourses.length);
            const pendingEx = Math.max(0, totalEx - Object.keys(state.user.passedExams || {}).length);

            const opts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: textColor, font: {family: 'Cairo', size: 11, weight: 'bold'}, padding: 10 } } } };

            const el1 = document.getElementById('chartLectures');
            if (el1) state.chartInstances.lec = new Chart(el1, { type: 'doughnut', data: { labels: [i18n[state.lang].chartAttended || 'منتهية', i18n[state.lang].chartUnattended || 'متبقية'], datasets: [{ data: [finishedLec||0.01, remainingLec||0.01], backgroundColor: ['#10b981','#64748b'], borderWidth: 0 }] }, options: opts });
            const m1 = document.getElementById('lectures-motivation');
            if (m1) m1.textContent = finishedLec > remainingLec ? (state.lang==='ar'?'ممتاز! أنت متقدم 🔥':'Excellent! 🔥') : (state.lang==='ar'?'كمّل المحاضرات المتبقية!':'Finish remaining!');

            const el2 = document.getElementById('chartHW');
            if (el2) state.chartInstances.hw = new Chart(el2, { type: 'doughnut', data: { labels: [i18n[state.lang].chartSub || 'مسلّمة', i18n[state.lang].chartUnsub || 'معلقة'], datasets: [{ data: [doneHW||0.01, pendingHW||0.01], backgroundColor: ['#6d28d9','#f59e0b'], borderWidth: 0 }] }, options: opts });
            const m2 = document.getElementById('hw-motivation');
            if (m2) m2.textContent = doneHW >= 2 ? (state.lang==='ar'?'واجباتك ممتازة 💪':'Great HW 💪') : (state.lang==='ar'?'سلّم المزيد من الواجبات':'Submit more HW');

            const el3 = document.getElementById('chartExams');
            if (el3) state.chartInstances.ex = new Chart(el3, { type: 'doughnut', data: { labels: [state.lang==='ar'?'ناجح':'Passed', state.lang==='ar'?'لم يُختبر':'Pending'], datasets: [{ data: [passedEx||0.01, pendingEx||0.01], backgroundColor: ['#10b981','#64748b'], borderWidth: 0 }] }, options: opts });
            const m3 = document.getElementById('exams-motivation');
            if (m3) m3.textContent = passedEx > 0 ? (state.lang==='ar'?'شهاداتك بتزيد 🏆':'Certificates growing 🏆') : (state.lang==='ar'?'اختبر نفسك بعد الكورس':'Take exams after courses');

            const el4 = document.getElementById('chartOverall');
            const pct = Math.round((finishedLec / totalPossibleLec) * 100);
            if (el4) state.chartInstances.ov = new Chart(el4, { type: 'bar', data: { labels: [state.lang==='ar'?'محاضرات':'Lectures', state.lang==='ar'?'واجبات':'HW', state.lang==='ar'?'اختبارات':'Exams'], datasets: [{ data: [pct, doneHW*20, passedEx*50], backgroundColor: ['#10b981','#6d28d9','#f59e0b'], borderRadius: 8 }] }, options: { ...opts, scales: { y: { beginAtZero: true, max: 100, ticks: { color: textColor }, grid: { color: 'rgba(128,128,128,0.1)' } }, x: { ticks: { color: textColor }, grid: { display: false } } }, plugins: { legend: { display: false } } } });
            const m4 = document.getElementById('overall-motivation');
            if (m4) m4.textContent = pct >= 50 ? (state.lang==='ar'?'أداء رائع! استمر 🌟':'Great job! 🌟') : (state.lang==='ar'?'ابدأ أول خطوة... كل نجاح بيبدأ من فكرة':'Start today... every success starts with an idea');
        }

        function joinCommunity() {
            if(!state.user.isLoggedIn) return showToast('loginReq', true);
            if (state.user.joinedCommunity) return showToast(state.lang==='ar'?'أنت منضم بالفعل':'Already joined');
            state.user.joinedCommunity = true;
            const btn = document.getElementById('join-comm-btn');
            btn.innerText = state.lang === 'ar' ? 'تم الانضمام' : 'Joined';
            btn.classList.replace('bg-customPrimary', 'bg-green-500');
            showToast(state.lang === 'ar' ? 'أهلاً بك في المجتمع!' : 'Welcome to Community!');
            updateCommunityLock();
        }
        function updateCommunityLock() {
            const locked = !state.user.joinedCommunity;
            document.querySelectorAll('.comments-section').forEach(el => {
                if (locked) el.classList.add('community-locked');
                else el.classList.remove('community-locked');
            });
            document.querySelectorAll('.like-btn').forEach(btn => {
                btn.style.pointerEvents = locked ? 'none' : 'auto';
                btn.style.opacity = locked ? '0.5' : '1';
            });
        }
        function toggleLike(btn) {
            if (!state.user.joinedCommunity) return showToast(state.lang==='ar'?'يجب الانضمام للمجتمع أولاً!':'Must join first!', true);
            if (!state.user.isLoggedIn) return showToast('loginReq', true);
            const liked = btn.dataset.liked === 'true';
            const countEl = btn.querySelector('.like-count');
            let count = parseInt(countEl.textContent);
            if (liked) { btn.dataset.liked = 'false'; btn.querySelector('i').className = 'far fa-heart'; countEl.textContent = count - 1; }
            else { btn.dataset.liked = 'true'; btn.querySelector('i').className = 'fas fa-heart text-red-500'; countEl.textContent = count + 1; }
        }
        function toggleComments(btn) {
            if (!state.user.joinedCommunity) return showToast(state.lang==='ar'?'يجب الانضمام للمجتمع أولاً!':'Must join first!', true);
            btn.closest('.bg-customCard').querySelector('.comments-section').classList.toggle('hidden');
        }
        function submitPost() {
            if (!state.user.isLoggedIn) return showToast('loginReq', true);
            if (!state.user.joinedCommunity) return showToast(state.lang==='ar'?'يجب الانضمام للمجتمع أولاً!':'Must join first!', true);
            const ta = document.getElementById('post-textarea');
            if (!ta || !ta.value.trim()) return;
            showToast(state.lang==='ar'?'تم نشر منشورك!':'Post published!');
            ta.value = '';
        }