// ==================== FIKRA PLATFORM - Main Script ====================
// Fully enhanced version with teacher full control, complete course builder,
// proper registration, wallet methods, i18n, stats, records, etc.

let state = {
    lang: 'ar',
    user: {
        isLoggedIn: false,
        role: 'student',
        name: '',
        email: '',
        wallet: 0,
        myCourses: [],
        completedHW: {},
        finishedLectures: {},
        passedExams: {},
        quizScores: {},
        watchHistory: [],
        hwGrades: {},
        solutionUnlocked: {},
        activity: [],
        joinedCommunity: false,
        ownedBooks: [],
        studentId: '',
        parentPhone: '',
        level: '',
        year: ''
    },
    currentCourseId: null,
    currentLectureIndex: 0,
    chartInstances: {},
    exam: { questions: [], answers: {}, current: 0, courseId: null },
    currentLectureTab: 'video',
    sidebarCollapsed: false
};

// ==================== TRANSLATIONS ====================
const translations = {
    ar: {
        platformName: 'FIKRA',
        platformNameHeader: 'منصة فكرة',
        pageTitle: 'منصة فكرة - FIKRA',
        dashboard: 'لوحة التحكم',
        myCourses: 'كورساتي',
        suggested: 'كورسات مقترحة',
        pdfLibrary: 'مكتبة الكتب',
        records: 'السجل',
        stats: 'إحصائياتي',
        community: 'مجتمع فكرة',
        instructorPanel: 'لوحة المعلم',
        manageCourses: 'إدارة الكورسات',
        manageStudents: 'قسم الطلاب',
        internalDMs: 'نظام المراسلة',
        themeCustomizer: 'تخصيص الواجهة',
        welcomeMsg: 'أهلاً بك في منصة فكرة!',
        welcomeSubLong: 'كل نجاح بيبدأ من فكرة. استكشف كورساتنا وابدأ رحلة التعلم.',
        quickLinks: 'اختصارات سريعة',
        wallet: 'المحفظة',
        activityLog: 'سجل النشاطات',
        logout: 'تسجيل الخروج',
        welcomeSub: 'مرحباً بك',
        studentLoginBtn: 'حسابي',
        loginTitle: 'تسجيل الدخول',
        registerTitle: 'إنشاء حساب جديد (طالب)',
        emailPlaceholder: 'البريد الإلكتروني',
        passPlaceholder: 'كلمة المرور',
        namePlaceholder: 'الاسم الرباعي',
        phonePlaceholder: 'رقم الموبايل',
        studentIdPlaceholder: 'رقم الطالب / القيد',
        parentPhonePlaceholder: 'رقم ولي الأمر (مطلوب)',
        levelLabel: 'المرحلة الدراسية',
        yearLabel: 'السنة الدراسية',
        createAccount: 'إنشاء الحساب',
        cancel: 'إلغاء',
        loginBtn: 'دخول',
        noAccount: 'ليس لدي حساب؟ أنشئ حساباً جديداً',
        haveAccount: 'لدي حساب بالفعل',
        joinNow: 'انضم الآن مجاناً',
        landingHero: 'تعلم بذكاء، وتفوق في دراستك مع منصة فكرة',
        landingSub: 'نحن فريق فكرة، نقدم لك تجربة تعليمية متكاملة تجمع بين الشرح المبسط، التقييم المستمر، والتواصل المباشر مع معلميك. انضم إلينا الآن وابدأ رحلة التفوق.',
        feature1Title: 'محاضرات تفاعلية',
        feature1Desc: 'شرح تفصيلي بجودة عالية مع ملخصات لكل درس.',
        feature2Title: 'واجبات واختبارات',
        feature2Desc: 'تطبيق عملي فوري وتقييم مستمر لمستواك.',
        feature3Title: 'مجتمع تعليمي',
        feature3Desc: 'تواصل مع زملائك ومعلميك في بيئة داعمة.',
        feature4Title: 'محفظة ذكية',
        feature4Desc: 'اشحن بسهولة عبر فوري أو فودافون كاش وابدأ التعلم فوراً.',
        landingBadge: 'كل نجاح بيبدأ من فكرة 💡',
        footer: 'Dev by Fikra Team | كل نجاح بيبدأ من فكرة | جميع الحقوق محفوظة 2026',
        buyCourse: 'شراء الكورس',
        owned: 'ممتلك',
        emptyCourses: 'لا توجد كورسات بعد. تصفح المقترحة!',
        chargeWallet: 'شحن المحفظة',
        instantPay: 'فوري',
        vodafoneCash: 'فودافون كاش',
        enterPhone: 'أدخل رقم الموبايل',
        chargeNow: 'اشحن الآن',
        testCharge: 'شحن تجريبي (500)',
        addCourse: 'إضافة كورس جديد',
        courseName: 'اسم الكورس',
        coursePrice: 'سعر الكورس (EGP)',
        courseStage: 'المرحلة الدراسية',
        courseYear: 'السنة الدراسية',
        courseThumb: 'الصورة المصغرة (اختياري)',
        addLesson: 'إضافة درس',
        publishCourse: 'نشر الكورس',
        backToCourses: 'العودة لإدارة الكورسات',
        lessonTitle: 'عنوان الدرس',
        addVideo: 'إضافة فيديو',
        videoExplain: 'فيديو الشرح',
        videoSummary: 'فيديو الملخص',
        videoSolution: 'فيديو الحل',
        homework: 'الواجب',
        addQuestion: 'إضافة سؤال',
        questionText: 'نص السؤال',
        option: 'اختيار',
        correctAnswer: 'الإجابة الصحيحة',
        saveQuestion: 'حفظ السؤال',
        noLessons: 'لا توجد دروس حالياً. اضغط على إضافة درس.',
        studentsTitle: 'قسم الطلاب',
        noStudents: 'لا يوجد طلاب مسجلين بعد.',
        communityTitle: 'مجتمع فكرة',
        joinCommunity: 'انضم للمجتمع',
        postPlaceholder: 'اكتب منشوراً...',
        postBtn: 'نشر',
        recordsTitle: 'السجل',
        watchHistory: 'سجل المشاهدة',
        hwHistory: 'سجل الواجبات',
        examHistory: 'سجل الاختبارات',
        statsTitle: 'إحصائياتي',
        views: 'المشاهدات',
        completedHW: 'واجبات محلولة',
        avgScore: 'متوسط الدرجات',
        progress: 'التقدم العام',
        librarySoon: 'المكتبة قريباً',
        selectConversation: 'اختر محادثة',
        typeMessage: 'اكتب رسالة...',
        searchStudent: 'ابحث عن طالب...',
        noActivity: 'لا يوجد نشاط بعد.',
        finishLecture: 'إنهاء المحاضرة',
        next: 'التالي',
        startHW: 'ابدأ الواجب',
        submitHW: 'تسليم الواجب',
        prev: 'السابق',
        score: 'النتيجة',
        viewSolution: 'مشاهدة الحل',
        lockedSolution: 'حل الواجب مقفول',
        customizeTitle: 'تخصيص الواجهة',
        primaryColor: 'اللون الأساسي',
        darkMode: 'الوضع الداكن',
        lightMode: 'الوضع الفاتح',
        apply: 'تطبيق',
        close: 'إغلاق',
        high: 'ثانوي',
        middle: 'إعدادي',
        univ: 'جامعي',
        year1: 'الصف الأول',
        year2: 'الصف الثاني',
        year3: 'الصف الثالث',
        year4: 'السنة الرابعة',
        teacherWelcome: 'أهلاً بك يا أستاذ',
        studentWelcome: 'مرحباً',
        fullNameError: 'الاسم يجب أن يكون رباعي (4 أسماء مفصولة بمسافات)',
        emailError: 'البريد الإلكتروني غير صحيح',
        phoneError: 'رقم الموبايل يجب أن يكون 11 رقم ويبدأ بـ 010/011/012/015',
        parentPhoneError: 'رقم ولي الأمر غير صحيح (11 رقم)',
        noAccountFound: 'لا يوجد حساب بهذا البريد. أنشئ حساباً أولاً من التسجيل.',
        wrongPassword: 'كلمة المرور غير صحيحة',
        bookAdded: 'تم إضافة الكتاب',
        bookDeleted: 'تم الحذف',
        bookBought: 'تم الشراء! يمكنك التحميل الآن',
        download: 'تحميل',
        buy: 'شراء',
        addBook: 'إضافة كتاب PDF',
        bookTitle: 'اسم المادة / الكتاب',
        publishBook: 'نشر الكتاب',
        noBooks: 'لا توجد كتب متاحة حالياً',
        allYears: 'كل السنوات',
        allFaculties: 'كل الكليات',
        allLevels: 'الكل',
        forAll: 'للجميع',
        yearLabelShort: 'سنة',
        faculty: 'الكلية',
        insufficientBalance: 'الرصيد غير كافٍ',
        posted: 'تم النشر',
        coursePublished: 'تم نشر الكورس بنجاح!',
        purchaseOk: 'تم الشراء بنجاح!',
        demoAccountCreated: 'تم إنشاء الحساب (وضع تجريبي)',
        loginSuccess: 'تم تسجيل الدخول بنجاح!',
        logoutSuccess: 'تم تسجيل الخروج',
        mustRegister: 'أنشئ حساباً أولاً'
    },
    en: {
        platformName: 'FIKRA',
        platformNameHeader: 'FIKRA PLATFORM',
        pageTitle: 'FIKRA Platform',
        dashboard: 'Dashboard',
        myCourses: 'My Courses',
        suggested: 'Suggested Courses',
        pdfLibrary: 'Books Library',
        records: 'Records',
        stats: 'My Stats',
        community: 'FIKRA Community',
        instructorPanel: 'Instructor Panel',
        manageCourses: 'Manage Courses',
        manageStudents: 'Students Section',
        internalDMs: 'Messaging System',
        themeCustomizer: 'Theme Customizer',
        welcomeMsg: 'Welcome to FIKRA Platform!',
        welcomeSubLong: 'Every success starts with an idea. Explore our courses and start your learning journey.',
        quickLinks: 'Quick Links',
        wallet: 'Wallet',
        activityLog: 'Activity Log',
        logout: 'Logout',
        welcomeSub: 'Welcome',
        studentLoginBtn: 'My Account',
        loginTitle: 'Login',
        registerTitle: 'Create New Account (Student)',
        emailPlaceholder: 'Email address',
        passPlaceholder: 'Password',
        namePlaceholder: 'Full Name',
        phonePlaceholder: 'Mobile Number',
        studentIdPlaceholder: 'Student / Enrollment ID',
        parentPhonePlaceholder: 'Parent Phone (Required)',
        levelLabel: 'Education Level',
        yearLabel: 'Academic Year',
        createAccount: 'Create Account',
        cancel: 'Cancel',
        loginBtn: 'Login',
        noAccount: "Don't have an account? Create one",
        haveAccount: 'I already have an account',
        joinNow: 'Join Free Now',
        landingHero: 'Learn Smart & Excel with FIKRA Platform',
        landingSub: 'We are the FIKRA team. We offer a complete learning experience with clear explanations, continuous assessment, and direct communication with your teachers. Join us now and start your excellence journey.',
        feature1Title: 'Interactive Lectures',
        feature1Desc: 'High-quality detailed explanations with summaries for every lesson.',
        feature2Title: 'Homework & Exams',
        feature2Desc: 'Immediate practical application and continuous evaluation of your level.',
        feature3Title: 'Learning Community',
        feature3Desc: 'Connect with peers and teachers in a supportive environment.',
        feature4Title: 'Smart Wallet',
        feature4Desc: 'Top up easily via Instant Pay or Vodafone Cash and start learning instantly.',
        landingBadge: 'Every success starts with an idea 💡',
        footer: 'Dev by Fikra Team | Every success starts with an idea | All rights reserved 2026',
        buyCourse: 'Buy Course',
        owned: 'Owned',
        emptyCourses: 'No courses yet. Browse suggested!',
        chargeWallet: 'Charge Wallet',
        instantPay: 'Instant Pay',
        vodafoneCash: 'Vodafone Cash',
        enterPhone: 'Enter mobile number',
        chargeNow: 'Charge Now',
        testCharge: 'Test Charge (500)',
        addCourse: 'Add New Course',
        courseName: 'Course Name',
        coursePrice: 'Course Price (EGP)',
        courseStage: 'Education Stage',
        courseYear: 'Academic Year',
        courseThumb: 'Thumbnail (Optional)',
        addLesson: 'Add Lesson',
        publishCourse: 'Publish Course',
        backToCourses: 'Back to Manage Courses',
        lessonTitle: 'Lesson Title',
        addVideo: 'Add Video',
        videoExplain: 'Explanation Video',
        videoSummary: 'Summary Video',
        videoSolution: 'Solution Video',
        homework: 'Homework',
        addQuestion: 'Add Question',
        questionText: 'Question Text',
        option: 'Option',
        correctAnswer: 'Correct Answer',
        saveQuestion: 'Save Question',
        noLessons: 'No lessons yet. Click Add Lesson.',
        studentsTitle: 'Students Section',
        noStudents: 'No registered students yet.',
        communityTitle: 'FIKRA Community',
        joinCommunity: 'Join Community',
        postPlaceholder: 'Write a post...',
        postBtn: 'Post',
        recordsTitle: 'Records',
        watchHistory: 'Watch History',
        hwHistory: 'Homework History',
        examHistory: 'Exam History',
        statsTitle: 'My Statistics',
        views: 'Views',
        completedHW: 'Completed HW',
        avgScore: 'Average Score',
        progress: 'Overall Progress',
        librarySoon: 'Library Coming Soon',
        selectConversation: 'Select a conversation',
        typeMessage: 'Type a message...',
        searchStudent: 'Search student...',
        noActivity: 'No activity yet.',
        finishLecture: 'Finish Lecture',
        next: 'Next',
        startHW: 'Start Homework',
        submitHW: 'Submit Homework',
        prev: 'Previous',
        score: 'Score',
        viewSolution: 'View Solution',
        lockedSolution: 'Solution is locked',
        customizeTitle: 'Customize Interface',
        primaryColor: 'Primary Color',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        apply: 'Apply',
        close: 'Close',
        high: 'High School',
        middle: 'Middle School',
        univ: 'University',
        year1: 'Year 1',
        year2: 'Year 2',
        year3: 'Year 3',
        year4: 'Year 4',
        teacherWelcome: 'Welcome Professor',
        studentWelcome: 'Hello',
        fullNameError: 'Full name must be 4 parts separated by spaces',
        emailError: 'Invalid email address',
        phoneError: 'Phone must be 11 digits starting with 010/011/012/015',
        parentPhoneError: 'Invalid parent phone (11 digits)',
        noAccountFound: 'No account found. Please register first.',
        wrongPassword: 'Wrong password',
        bookAdded: 'Book added',
        bookDeleted: 'Deleted',
        bookBought: 'Purchased! You can download now',
        download: 'Download',
        buy: 'Buy',
        addBook: 'Add PDF Book',
        bookTitle: 'Subject / Book name',
        publishBook: 'Publish Book',
        noBooks: 'No books available yet',
        allYears: 'All years',
        allFaculties: 'All faculties',
        allLevels: 'All',
        forAll: 'For everyone',
        yearLabelShort: 'Year',
        faculty: 'Faculty',
        insufficientBalance: 'Insufficient balance',
        posted: 'Posted',
        coursePublished: 'Course published successfully!',
        purchaseOk: 'Purchase successful!',
        demoAccountCreated: 'Account created (demo mode)',
        loginSuccess: 'Logged in successfully!',
        logoutSuccess: 'Logged out',
        mustRegister: 'Please register first'
    }
};

const motivations = {
    ar: [
        '💡 كل نجاح بيبدأ من فكرة... استمر!',
        '🚀 التعلم استثمار في نفسك، متوقفش!',
        '🔥 أنت أقرب للنجاح مما تتخيل!',
        '💪 كل محاضرة بتخلّيك أقوى!',
        '🌟 الفكرة الجيدة تستاهل التنفيذ!'
    ],
    en: [
        '💡 Every success starts with an idea... keep going!',
        '🚀 Learning is an investment in yourself!',
        '🔥 You are closer to success than you think!',
        '💪 Every lecture makes you stronger!',
        '🌟 A good idea deserves to be executed!'
    ]
};
let motivIndex = 0;

// ==================== FACULTIES (University) ====================
const FACULTIES = [
    { id: 'medicine', nameAr: 'طب بشري', nameEn: 'Medicine', years: 7 },
    { id: 'dentistry', nameAr: 'طب أسنان', nameEn: 'Dentistry', years: 5 },
    { id: 'pharmacy', nameAr: 'صيدلة', nameEn: 'Pharmacy', years: 6 },
    { id: 'engineering', nameAr: 'هندسة', nameEn: 'Engineering', years: 5 },
    { id: 'cs', nameAr: 'حاسبات ومعلومات', nameEn: 'Computer Science', years: 4 },
    { id: 'science', nameAr: 'علوم', nameEn: 'Science', years: 4 },
    { id: 'nursing', nameAr: 'تمريض', nameEn: 'Nursing', years: 4 },
    { id: 'pt', nameAr: 'علاج طبيعي', nameEn: 'Physical Therapy', years: 5 },
    { id: 'alson', nameAr: 'ألسن', nameEn: 'Al-Alsun', years: 4 },
    { id: 'arts', nameAr: 'آداب', nameEn: 'Arts', years: 4 },
    { id: 'education', nameAr: 'تربية', nameEn: 'Education', years: 4 },
    { id: 'commerce', nameAr: 'تجارة', nameEn: 'Commerce', years: 4 },
    { id: 'law', nameAr: 'حقوق', nameEn: 'Law', years: 4 },
    { id: 'masscom', nameAr: 'إعلام', nameEn: 'Mass Communication', years: 4 },
    { id: 'agriculture', nameAr: 'زراعة', nameEn: 'Agriculture', years: 4 },
    { id: 'veterinary', nameAr: 'طب بيطري', nameEn: 'Veterinary Medicine', years: 5 },
    { id: 'finearts', nameAr: 'فنون جميلة', nameEn: 'Fine Arts', years: 4 },
    { id: 'appliedarts', nameAr: 'فنون تطبيقية', nameEn: 'Applied Arts', years: 4 },
    { id: 'tourism', nameAr: 'سياحة وفنادق', nameEn: 'Tourism & Hotels', years: 4 },
    { id: 'economics', nameAr: 'اقتصاد وعلوم سياسية', nameEn: 'Economics & Political Science', years: 4 },
    { id: 'specific_edu', nameAr: 'تربية نوعية', nameEn: 'Specific Education', years: 4 },
    { id: 'kindergarten', nameAr: 'تربية طفولة', nameEn: 'Kindergarten Education', years: 4 },
    { id: 'other', nameAr: 'أخرى', nameEn: 'Other', years: 4 }
];


function levelLabel(level) {
    const map = {
        all: { ar: 'للجميع', en: 'For everyone' },
        high: { ar: 'ثانوي', en: 'High School' },
        middle: { ar: 'إعدادي', en: 'Middle School' },
        univ: { ar: 'جامعي', en: 'University' }
    };
    const m = map[level];
    if (!m) return level || '';
    return state.lang === 'ar' ? m.ar : m.en;
}

function getFacultyName(id) {
    const f = FACULTIES.find(x => x.id === id);
    if (!f) return id || '';
    return state.lang === 'ar' ? f.nameAr : f.nameEn;
}

// ==================== LOCAL PERSISTENCE ====================
const STORAGE_KEY = 'fikra_platform_v1';

function saveToStorage() {
    try {
        const payload = {
            user: state.user,
            lang: state.lang,
            db: {
                courses: db.courses,
                students: db.students,
                books: db.books,
                communityPosts: db.communityPosts,
                communities: db.communities,
                messages: db.messages,
                progress: db.progress
            },
            savedAt: Date.now()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
        console.warn('saveToStorage failed', e);
    }
}

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const data = JSON.parse(raw);
        if (data.db) {
            if (Array.isArray(data.db.courses)) db.courses = data.db.courses;
            if (Array.isArray(data.db.students)) db.students = data.db.students;
            if (Array.isArray(data.db.books)) db.books = data.db.books;
            if (Array.isArray(data.db.communityPosts)) db.communityPosts = data.db.communityPosts;
            if (Array.isArray(data.db.communities)) db.communities = data.db.communities;
            if (data.db.messages) db.messages = data.db.messages;
            if (data.db.progress) db.progress = data.db.progress;
        }
        if (data.lang) state.lang = data.lang;
        if (data.user && data.user.isLoggedIn) {
            state.user = { ...state.user, ...data.user };
            return true; // was logged in
        }
        return false;
    } catch (e) {
        console.warn('loadFromStorage failed', e);
        return false;
    }
}

function clearSessionKeepData() {
    // Keep db data, only clear user session
    state.user.isLoggedIn = false;
    state.user.role = 'student';
    state.user.name = '';
    state.user.email = '';
    state.user.wallet = 0;
    state.user.myCourses = [];
    state.user.ownedBooks = [];
    state.user.activity = [];
    state.user.completedHW = {};
    state.user.finishedLectures = {};
    state.user.hwGrades = {};
    state.user.solutionUnlocked = {};
    state.user.watchHistory = [];
    state.user.joinedCommunity = false;
    saveToStorage();
}



// ==================== MOCK DATABASE ====================
const db = {
    progress: {},
    courses: [
        {
            id: 'c_html',
            name: 'HTML5 Course',
            desc: 'أساسيات بناء هيكل الويب',
            price: 150,
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
            stage: 'univ',
            year: '1',
            lessons: [
                {
                    title: 'Introduction to HTML',
                    explainUrl: '',
                    summaryUrl: '',
                    solutionUrl: '',
                    questions: [
                        { text: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'], correct: 0 }
                    ]
                },
                {
                    title: 'Basic Tags',
                    explainUrl: '',
                    summaryUrl: '',
                    solutionUrl: '',
                    questions: []
                }
            ]
        },
        {
            id: 'c_css',
            name: 'CSS3 Master',
            desc: 'تنسيق وتصميم واجهات احترافية',
            price: 200,
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
            stage: 'univ',
            year: '1',
            lessons: [
                {
                    title: 'CSS Selectors',
                    explainUrl: '',
                    summaryUrl: '',
                    solutionUrl: '',
                    questions: []
                }
            ]
        }
    ],
    students: [
        { id: 's1', name: 'أحمد محمد', email: 'ahmed@example.com', level: 'high', year: '3', joined: '2026-01-15' }
    ],
    messages: {},
    books: [
        { id: 'b1', title: 'ملخص فيزياء أولى ثانوي', level: 'high', year: '1', faculty: '', price: 25, fileName: 'physics_y1.pdf', addedBy: 'المعلم' }
    ],
    communityPosts: [
        { id: 1, communityId: 'general', author: 'المعلم', role: 'teacher', text: 'مرحباً بكم في مجتمع فكرة! شاركونا أفكاركم.', time: '2026-10-20' }
    ],
    communities: [
        { id: 'general', nameAr: 'مجتمع فكرة', nameEn: 'FIKRA Community', isDefault: true }
    ]
};

// Builder state
let builderLessons = [];
let currentBuilderCourseId = null; // for edit

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('fikra-theme');
    if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    else if (savedTheme === 'light') document.documentElement.classList.remove('dark');
    setTimeout(updateThemeToggleUI, 50);

    const savedPrimary = localStorage.getItem('fikra-primary');
    if (savedPrimary) {
        document.documentElement.style.setProperty('--primary-color', savedPrimary);
    }

    // Restore platform data + session
    const wasLoggedIn = loadFromStorage();

    // Lang (storage may override)
    const savedLang = state.lang || localStorage.getItem('fikra-lang') || 'ar';
    state.lang = savedLang;
    localStorage.setItem('fikra-lang', savedLang);
    applyLanguage();

    renderSuggested();
    updateWalletUI();
    renderInstCourses();
    renderStudents();
    renderCommunity();
    renderActivity();
    updateRegFormFields();
    populateFaculties();

    // Auto re-login UI if session existed
    if (wasLoggedIn && state.user.isLoggedIn) {
        document.getElementById('landing-page').classList.add('hidden');
        const app = document.getElementById('app-wrapper');
        app.classList.remove('hidden');
        app.style.opacity = '1';
        document.getElementById('dropdown-name').innerText = state.user.name;
        const welcomeEl = document.getElementById('welcome-title');
        if (welcomeEl) {
            welcomeEl.innerText = state.user.role === 'teacher'
                ? `${t('teacherWelcome')} ${state.user.name}`
                : `${t('studentWelcome')} ${state.user.name}!`;
        }
        applyPermissions();
        updateWalletUI();
        renderMyCourses();
        renderSuggested();
    }

    // Firebase auth listener
    if (window.firebaseApp) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.firestore().collection('users').doc(user.uid).get().then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        handleSuccessfulLogin(data.role || 'student', data.name || user.email, user.email, data);
                    } else {
                        handleSuccessfulLogin('student', user.email.split('@')[0], user.email);
                    }
                }).catch(() => handleSuccessfulLogin('student', user.email.split('@')[0], user.email));
            }
        });
    }

    // Motivation cycle
    setInterval(cycleMotivation, 3600000);
});

// ==================== LANGUAGE ====================
function toggleLanguage() {
    state.lang = state.lang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('fikra-lang', state.lang);
    applyLanguage();
}

function applyLanguage() {
    const lang = state.lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update all data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Specific elements
    const langText = document.getElementById('lang-text');
    if (langText) langText.textContent = lang === 'ar' ? 'EN' : 'عربي';
    const landingLang = document.getElementById('landing-lang-text');
    if (landingLang) landingLang.textContent = lang === 'ar' ? 'EN' : 'عربي';

    // Update motivation
    const motivEl = document.getElementById('motivation-text');
    if (motivEl) motivEl.textContent = motivations[lang][motivIndex % motivations[lang].length];

    // Re-render dynamic parts that need translation
    renderSuggested();
    renderMyCourses();
    renderInstCourses();
    renderStudents();
    renderCommunity();
    renderRecords();
    renderStats();
}

function t(key) {
    return translations[state.lang][key] || key;
}

// ==================== MOTIVATION ====================
function cycleMotivation() {
    const box = document.getElementById('motivation-box');
    const el = document.getElementById('motivation-text');
    if (!el) return;
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

// ==================== UI HELPERS ====================
function showToast(text, isError = false) {
    const t = document.getElementById('toast');
    if (!t) return;
    document.getElementById('toast-message').innerText = text;
    t.className = `fixed top-4 start-1/2 -translate-x-1/2 text-white px-6 py-3 rounded-full shadow-lg z-[100] flex items-center gap-3 transition-all duration-300 ${isError ? 'bg-red-500' : 'bg-customPrimary'} show`;
    document.getElementById('toast-icon').className = isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
    setTimeout(() => {
        t.classList.remove('show');
        t.classList.add('opacity-0', 'pointer-events-none');
    }, 3200);
}

function switchView(id, navEl = null) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');

    if (navEl) {
        document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
        navEl.classList.add('active');
    } else {
        // Try to highlight matching nav
        const map = {
            'dashboard-view': 'nav-dashboard',
            'my-courses-view': null,
            'suggested-courses-view': null,
            'library-view': null,
            'records-view': null,
            'stats-view': null,
            'community-view': null,
            'inst-courses-view': null,
            'inst-students-view': null,
            'inst-messages-view': null,
            'wallet-view': null
        };
    }

    if (window.innerWidth < 1024) closeMobileSidebar();
    const scrollArea = document.getElementById('main-scroll-area');
    if (scrollArea) scrollArea.scrollTo(0, 0);

    // Special renders
    if (id === 'inst-courses-view') renderInstCourses();
    if (id === 'inst-students-view') renderStudents();
    if (id === 'community-view') renderCommunity();
    if (id === 'records-view') renderRecords();
    if (id === 'stats-view') renderStats();
    if (id === 'my-courses-view') renderMyCourses();
    if (id === 'suggested-courses-view') renderSuggested();
    if (id === 'library-view') { populateLibFaculties(); updateLibFormFields(); renderLibrary(); }
    if (id === 'inst-messages-view') { closeDMChat(); renderDMStudents(); }
}

function goToDashboard() {
    switchView('dashboard-view', document.getElementById('nav-dashboard'));
}

function openModal(id) {
    const m = document.getElementById(id);
    if (m) {
        m.classList.remove('opacity-0', 'pointer-events-none');
    }
}
function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('opacity-0', 'pointer-events-none');
}

function toggleMobileSidebar() {
    const sb = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sb.classList.toggle('mobile-closed');
    overlay.classList.toggle('active');
}
function closeMobileSidebar() {
    document.getElementById('sidebar').classList.add('mobile-closed');
    document.getElementById('sidebar-overlay').classList.remove('active');
}

function toggleSidebarCollapse() {
    // Only on desktop
    if (window.innerWidth < 1024) {
        toggleMobileSidebar();
        return;
    }
    const sb = document.getElementById('sidebar');
    state.sidebarCollapsed = !state.sidebarCollapsed;
    sb.classList.toggle('collapsed', state.sidebarCollapsed);
}

function toggleUserMenu() {
    document.getElementById('user-dropdown').classList.toggle('hidden');
}
function closeUserMenu() {
    document.getElementById('user-dropdown').classList.add('hidden');
}
function openRegister() {
    closeModal('login-modal');
    setTimeout(() => openModal('reg-modal'), 280);
}

function clearNavActive() {
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
}

// ==================== REGISTRATION FORM LOGIC ====================
function updateRegFormFields() {
    const level = document.getElementById('reg-level')?.value || 'high';
    const parentWrap = document.getElementById('reg-parent-wrap');
    const facultyWrap = document.getElementById('reg-faculty-wrap');
    const yearSelect = document.getElementById('reg-year');

    if (parentWrap) parentWrap.classList.toggle('hidden', level === 'univ');
    if (facultyWrap) facultyWrap.classList.toggle('hidden', level !== 'univ');

    // Rebuild year options
    if (!yearSelect) return;
    yearSelect.innerHTML = '';
    let maxYear = 3;
    if (level === 'univ') {
        const fid = document.getElementById('reg-faculty')?.value || 'cs';
        const fac = FACULTIES.find(f => f.id === fid);
        maxYear = fac ? fac.years : 4;
    }
    for (let i = 1; i <= maxYear; i++) {
        const opt = document.createElement('option');
        opt.value = String(i);
        if (state.lang === 'ar') {
            opt.textContent = (level === 'univ' ? 'الفرقة ' : 'الصف ') + (['الأول','الثاني','الثالث','الرابع','الخامس','السادس','السابع'][i-1] || i);
        } else {
            opt.textContent = 'Year ' + i;
        }
        yearSelect.appendChild(opt);
    }
}

function populateFaculties() {
    const sel = document.getElementById('reg-faculty');
    if (!sel) return;
    sel.innerHTML = FACULTIES.map(f => 
        `<option value="${f.id}">${state.lang === 'ar' ? f.nameAr : f.nameEn} (${f.years})</option>`
    ).join('');
}

// ==================== AUTH ====================

function isValidFullName(name) {
    // رباعي = 4 أجزاء على الأقل (3 مسافات)
    const parts = name.trim().split(/\s+/).filter(Boolean);
    return parts.length >= 4;
}
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
function isValidEgyptianPhone(phone) {
    const p = phone.replace(/\s+/g, '');
    return /^01[0125][0-9]{8}$/.test(p); // 11 digits starting 010/011/012/015
}

function performAuth(type) {
    // ========== DEMO MODE (when Firebase keys not set) ==========
    if (!window.firebaseApp) {
        if (type === 'register') {
            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const pass = document.getElementById('reg-pass').value;
            const phone = document.getElementById('reg-phone')?.value.trim() || '';
            const level = document.getElementById('reg-level').value;
            const year = document.getElementById('reg-year')?.value || '1';
            const parentPhone = document.getElementById('reg-parent')?.value.trim() || '';
            const faculty = level === 'univ' ? (document.getElementById('reg-faculty')?.value || '') : '';

            if (!name || !email || !pass)
                return showToast(state.lang === 'ar' ? 'يرجى ملء الحقول الأساسية' : 'Fill required fields', true);
            if (!isValidFullName(name))
                return showToast(state.lang === 'ar' ? 'الاسم يجب أن يكون رباعي (4 أسماء مفصولة بمسافات)' : 'Full name must be 4 parts', true);
            if (!isValidEmail(email))
                return showToast(state.lang === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email', true);
            if (pass.length < 6)
                return showToast(state.lang === 'ar' ? 'كلمة المرور 6 أحرف على الأقل' : 'Password min 6 chars', true);
            if (phone && !isValidEgyptianPhone(phone))
                return showToast(state.lang === 'ar' ? 'رقم الموبايل يجب أن يكون 11 رقم ويبدأ بـ 010/011/012/015' : 'Phone must be 11 digits (01x)', true);
            if (level !== 'univ') {
                if (!parentPhone)
                    return showToast(state.lang === 'ar' ? 'رقم ولي الأمر مطلوب' : 'Parent phone required', true);
                if (!isValidEgyptianPhone(parentPhone))
                    return showToast(state.lang === 'ar' ? 'رقم ولي الأمر غير صحيح (11 رقم)' : 'Invalid parent phone', true);
            }
            if (level === 'univ' && !faculty)
                return showToast(state.lang === 'ar' ? 'اختر الكلية' : 'Select faculty', true);

            db.students.push({
                id: 's_' + Date.now(), name, email, pass, level, year, faculty,
                parentPhone: level === 'univ' ? '' : parentPhone, phone,
                joined: new Date().toISOString().slice(0, 10)
            });
            saveToStorage();
            handleSuccessfulLogin('student', name, email, { level, year, faculty, parentPhone, phone });
            closeModal('reg-modal');
            showToast(state.lang === 'ar' ? 'تم إنشاء الحساب (وضع تجريبي)' : 'Account created (demo mode)');
            return;
        }

        // Login demo – only registered accounts or teacher
        const email = document.getElementById('login-user').value.trim();
        const pass = document.getElementById('login-pass').value;
        if (!email || !pass)
            return showToast(state.lang === 'ar' ? 'أدخل البريد وكلمة المرور' : 'Enter email & password', true);

        // Teacher demo credentials
        if (email === 'admin@fikra.com' && pass === 'admin123') {
            handleSuccessfulLogin('teacher', state.lang === 'ar' ? 'المعلم (أدمن)' : 'Admin Teacher', email);
            closeModal('login-modal');
            return;
        }

        // Student must have registered before
        const existing = db.students.find(s => s.email.toLowerCase() === email.toLowerCase());
        if (!existing) {
            return showToast(state.lang === 'ar'
                ? 'لا يوجد حساب بهذا البريد. أنشئ حساباً أولاً من التسجيل.'
                : 'No account found. Please register first.', true);
        }
        // Simple password check in demo (stored on register if we add it)
        if (existing.pass && existing.pass !== pass) {
            return showToast(state.lang === 'ar' ? 'كلمة المرور غير صحيحة' : 'Wrong password', true);
        }
        handleSuccessfulLogin('student', existing.name, email, existing);
        closeModal('login-modal');
        return;
    }

    // ========== REAL FIREBASE ==========
    if (type === 'register') {
        const email = document.getElementById('reg-email').value.trim();
        const pass = document.getElementById('reg-pass').value;
        const name = document.getElementById('reg-name').value.trim();
        const phone = document.getElementById('reg-phone')?.value.trim() || '';
        const level = document.getElementById('reg-level').value;
        const year = document.getElementById('reg-year')?.value || '1';
        const parentPhone = document.getElementById('reg-parent')?.value.trim() || '';
        const faculty = level === 'univ' ? (document.getElementById('reg-faculty')?.value || '') : '';

        if (!email || !pass || !name)
            return showToast(state.lang === 'ar' ? 'يرجى ملء الحقول الأساسية' : 'Fill required fields', true);
        if (!isValidFullName(name))
            return showToast(state.lang === 'ar' ? 'الاسم يجب أن يكون رباعي (4 أسماء)' : 'Full name must be 4 parts', true);
        if (!isValidEmail(email))
            return showToast(state.lang === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email', true);
        if (pass.length < 6)
            return showToast(state.lang === 'ar' ? 'كلمة المرور 6 أحرف على الأقل' : 'Password min 6 chars', true);
        if (phone && !isValidEgyptianPhone(phone))
            return showToast(state.lang === 'ar' ? 'رقم الموبايل 11 رقم (010/011/012/015)' : 'Invalid phone', true);
        if (level !== 'univ') {
            if (!parentPhone) return showToast(state.lang === 'ar' ? 'رقم ولي الأمر مطلوب' : 'Parent phone required', true);
            if (!isValidEgyptianPhone(parentPhone)) return showToast(state.lang === 'ar' ? 'رقم ولي الأمر غير صحيح' : 'Invalid parent phone', true);
        }
        if (level === 'univ' && !faculty)
            return showToast(state.lang === 'ar' ? 'اختر الكلية' : 'Select faculty', true);

        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then((cred) => {
                const data = {
                    name, email, role: 'student', level, year, phone,
                    parentPhone: level === 'univ' ? '' : parentPhone,
                    faculty: faculty || '',
                    wallet: 0, myCourses: [],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };
                return firebase.firestore().collection('users').doc(cred.user.uid).set(data).then(() => data);
            })
            .then((data) => {
                handleSuccessfulLogin('student', name, email, data);
                closeModal('reg-modal');
                showToast(state.lang === 'ar' ? 'تم إنشاء الحساب بنجاح!' : 'Account created!');
            })
            .catch(err => showToast(err.message || 'Error', true));

    } else {
        const email = document.getElementById('login-user').value.trim();
        const pass = document.getElementById('login-pass').value;
        if (!email || !pass)
            return showToast(state.lang === 'ar' ? 'أدخل البريد وكلمة المرور' : 'Enter email & password', true);

        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(() => closeModal('login-modal'))
            .catch(err => {
                let msg = err.message;
                if (['auth/user-not-found','auth/wrong-password','auth/invalid-credential','auth/invalid-email'].includes(err.code)) {
                    msg = state.lang === 'ar' ? 'بيانات الدخول غير صحيحة أو الحساب غير موجود' : 'Invalid credentials or account not found';
                }
                showToast(msg, true);
            });
    }
}

function handleSuccessfulLogin(role, name, email, extra = {}) {
    state.user.isLoggedIn = true;
    state.user.role = role;
    state.user.name = name;
    state.user.email = email;
    state.user.level = extra.level || '';
    state.user.year = extra.year || '';
    state.user.faculty = extra.faculty || '';
    state.user.studentId = extra.studentId || '';
    state.user.parentPhone = extra.parentPhone || '';
    state.user.ownedBooks = extra.ownedBooks || [];
    if (typeof extra.wallet === 'number') state.user.wallet = extra.wallet;

    // Transition
    const landing = document.getElementById('landing-page');
    landing.style.opacity = '0';
    setTimeout(() => {
        landing.classList.add('hidden');
        const app = document.getElementById('app-wrapper');
        app.classList.remove('hidden');
        app.style.opacity = '0';
        setTimeout(() => app.style.opacity = '1', 40);
    }, 400);

    document.getElementById('dropdown-name').innerText = name;
    const welcomeEl = document.getElementById('welcome-title');
    if (welcomeEl) {
        welcomeEl.innerText = role === 'teacher'
            ? `${t('teacherWelcome')} ${name}`
            : `${t('studentWelcome')} ${name}!`;
    }

    applyPermissions();
    addActivity(role === 'teacher' ? (state.lang==='ar'?'تم تسجيل دخول المعلم':'Teacher logged in') : (state.lang==='ar'?'تم تسجيل الدخول':'Logged in'));
    saveToStorage();
    showToast(state.lang === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Logged in successfully!');
}


function resetUserState() {
    state.user = {
        isLoggedIn: false, role: 'student', name: '', email: '', wallet: 0,
        myCourses: [], completedHW: {}, finishedLectures: {}, passedExams: {},
        quizScores: {}, watchHistory: [], hwGrades: {}, solutionUnlocked: {},
        activity: [], joinedCommunity: false,
        studentId: '', parentPhone: '',
        level: '', year: '', faculty: '', ownedBooks: []
    };
    state.currentCourseId = null;
    state.currentLectureIndex = 0;
}

function performLogout() {
    if (window.firebaseApp) firebase.auth().signOut();
    clearSessionKeepData();
    updateWalletUI();
    closeUserMenu();

    const app = document.getElementById('app-wrapper');
    app.style.opacity = '0';
    setTimeout(() => {
        app.classList.add('hidden');
        const landing = document.getElementById('landing-page');
        landing.classList.remove('hidden');
        landing.scrollTop = 0;
        landing.style.opacity = '0';
        setTimeout(() => landing.style.opacity = '1', 40);
    }, 400);
    showToast(state.lang === 'ar' ? 'تم تسجيل الخروج' : 'Logged out');
}

function applyPermissions() {
    const isTeacher = state.user.role === 'teacher';
    document.querySelectorAll('.teacher-only').forEach(el => {
        el.classList.toggle('hidden', !isTeacher);
    });
    // Kick student from teacher views
    const active = document.querySelector('.view-section.active');
    if (active && active.classList.contains('teacher-only') && !isTeacher) {
        goToDashboard();
    }
}

// ==================== WALLET ====================
function updateWalletUI() {
    const bal = state.user.wallet;
    const el1 = document.getElementById('wallet-balance');
    const el2 = document.getElementById('wallet-large-balance');
    if (el1) el1.innerText = `${bal} EGP`;
    if (el2) el2.innerText = bal;
}

function testCharge() {
    state.user.wallet += 500;
    updateWalletUI();
    saveToStorage();
    addActivity('شحن تجريبي +500 EGP');
    showToast(state.lang === 'ar' ? 'تم الشحن التجريبي بنجاح!' : 'Test charge successful!');
}

function openPayment(method) {
    state.payMethod = method;
    const panel = document.getElementById('payment-panel');
    if (!panel) return;
    panel.classList.remove('hidden');
    document.getElementById('pay-method-title').textContent = method === 'instant' ? t('instantPay') : t('vodafoneCash');
    document.getElementById('pay-phone-wrap').classList.toggle('hidden', method === 'instant');
    document.getElementById('pay-code-wrap').classList.toggle('hidden', method !== 'instant');
    if (method === 'instant') {
        const code = String(Math.floor(100000 + Math.random() * 900000));
        const codeEl = document.getElementById('pay-code');
        if (codeEl) codeEl.value = code;
    }
}

function confirmPayment() {
    const amount = parseInt(document.getElementById('pay-amount')?.value || '100', 10);
    if (isNaN(amount) || amount < 10) return showToast(state.lang === 'ar' ? 'أدخل مبلغ صحيح' : 'Enter valid amount', true);

    if (state.payMethod === 'vodafone') {
        const phone = document.getElementById('pay-phone')?.value.trim();
        if (!phone || phone.length < 10) return showToast(state.lang === 'ar' ? 'أدخل رقم صحيح' : 'Enter valid phone', true);
    }

    // Simulate success
    state.user.wallet += amount;
    updateWalletUI();
    saveToStorage();
    addActivity(`شحن ${amount} EGP عبر ${state.payMethod === 'instant' ? 'فوري' : 'فودافون كاش'}`);
    showToast(state.lang === 'ar' ? `تم شحن ${amount} EGP بنجاح!` : `Successfully charged ${amount} EGP!`);
    document.getElementById('payment-panel').classList.add('hidden');
}

// ==================== COURSES (Student) ====================
function renderSuggested() {
    const g = document.getElementById('suggested-grid');
    if (!g) return;
    g.innerHTML = '';
    // للطالب: كورسات مرحلته + كورسات «للجميع». للمعلم: الكل
    const list = db.courses.filter(c => {
        if (state.user.role === 'teacher') return true;
        const st = c.stage || 'all';
        if (st === 'all') return true;
        if (state.user.level && st !== state.user.level) return false;
        if (c.year && c.year !== 'all' && state.user.year && String(c.year) !== String(state.user.year)) return false;
        if (st === 'univ' && c.faculty && state.user.faculty && c.faculty !== state.user.faculty) return false;
        return true;
    });
    list.forEach(c => {
        const owned = state.user.myCourses.includes(c.id);
        const btnText = owned ? t('owned') : t('buyCourse');
        const btnStyle = owned
            ? 'bg-black/10 cursor-not-allowed opacity-70'
            : 'bg-customPrimary hover:opacity-90 shadow-lg hover:-translate-y-1 transform transition-all';
        const logoHtml = c.logo
            ? `<img src="${c.logo}" class="w-16 h-16 mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform object-contain" alt="">`
            : `<div class="w-16 h-16 mx-auto mb-4 relative z-10 rounded-xl bg-customPrimary/15 flex items-center justify-center text-2xl font-black text-customPrimary">${(c.name || 'C')[0]}</div>`;

        g.innerHTML += `
            <div class="bg-customCard p-5 rounded-2xl border border-slate-200/20 shadow-sm flex flex-col justify-between text-center relative overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-b from-customPrimary/5 to-transparent"></div>
                ${logoHtml}
                <h3 class="text-xl font-bold mb-1 relative z-10" dir="ltr">${c.name}</h3>
                <p class="text-xs opacity-70 mb-4 relative z-10">${c.desc || ''}</p>
                <div class="flex items-center justify-between mt-auto relative z-10">
                    <span class="font-black text-lg text-customPrimary">${c.price} EGP</span>
                    <button onclick="${owned ? '' : `buyCourse('${c.id}', ${c.price})`}" class="px-5 py-2 rounded-xl text-white font-bold text-sm ${btnStyle}">${btnText}</button>
                </div>
            </div>`;
    });
}

function buyCourse(id, price) {
    if (state.user.wallet < price) return showToast(state.lang === 'ar' ? 'الرصيد غير كافٍ! اشحن محفظتك.' : 'Insufficient balance!', true);
    state.user.wallet -= price;
    state.user.myCourses.push(id);
    trackProgress('course', { id });
    updateWalletUI();
    renderSuggested();
    renderMyCourses();
    addActivity(`تم شراء كورس: ${db.courses.find(c => c.id === id)?.name || id}`);
    showToast(state.lang === 'ar' ? 'تم الشراء بنجاح!' : 'Purchase successful!');
    saveToStorage();
}

function renderMyCourses() {
    const g = document.getElementById('my-courses-grid');
    const e = document.getElementById('my-courses-empty');
    if (!g) return;
    if (state.user.myCourses.length === 0) {
        g.classList.add('hidden');
        if (e) e.classList.remove('hidden');
        return;
    }
    if (e) e.classList.add('hidden');
    g.classList.remove('hidden');
    g.innerHTML = '';
    state.user.myCourses.forEach(id => {
        const c = db.courses.find(x => x.id === id);
        if (!c) return;
        const logoHtml = c.logo
            ? `<img src="${c.logo}" class="w-12 h-12 object-contain group-hover:scale-110 transition-transform">`
            : `<div class="w-12 h-12 rounded-lg bg-customPrimary/15 flex items-center justify-center font-black text-customPrimary">${c.name[0]}</div>`;
        g.innerHTML += `
            <div onclick="openCourse('${id}')" class="bg-customCard p-5 rounded-2xl border border-slate-200/20 shadow-sm cursor-pointer hover:border-customPrimary hover:shadow-lg transition-all group flex items-center gap-4">
                ${logoHtml}
                <div>
                    <h3 class="font-bold text-lg" dir="ltr">${c.name}</h3>
                    <p class="text-xs text-customPrimary font-bold opacity-80 mt-1">${state.lang === 'ar' ? 'ابدأ التعلم' : 'Start learning'} <i class="fas fa-play text-[10px]"></i></p>
                </div>
            </div>`;
    });
}

function openCourse(id) {
    state.currentCourseId = id;
    const c = db.courses.find(x => x.id === id);
    if (!c) return;
    document.getElementById('detail-course-title').innerText = c.name;
    const imgEl = document.getElementById('detail-course-img');
    if (c.logo) {
        imgEl.src = c.logo;
        imgEl.classList.remove('hidden');
    } else {
        imgEl.classList.add('hidden');
    }

    let list = '';
    const lessons = c.lessons || [];
    if (lessons.length === 0) {
        list = `<p class="text-center opacity-60 py-8">${state.lang === 'ar' ? 'لا توجد دروس بعد' : 'No lessons yet'}</p>`;
    } else {
        lessons.forEach((lec, i) => {
            list += `
                <div onclick="startLec(${i})" class="flex items-center justify-between p-4 rounded-xl border border-slate-200/20 bg-black/5 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer transition-colors">
                    <div class="flex items-center gap-3 font-bold">
                        <div class="w-8 h-8 rounded bg-customPrimary/20 text-customPrimary flex items-center justify-center">${i + 1}</div>
                        <span>${lec.title || (state.lang === 'ar' ? 'درس ' + (i + 1) : 'Lesson ' + (i + 1))}</span>
                    </div>
                    <i class="fas fa-play text-customPrimary/50"></i>
                </div>`;
        });
    }
    document.getElementById('lectures-list').innerHTML = list;
    switchView('course-details-view');
}

function startLec(index) {
    state.currentLectureIndex = index;
    const c = db.courses.find(x => x.id === state.currentCourseId);
    const lec = c?.lessons?.[index];
    document.getElementById('current-lecture-title').innerText = lec?.title || `الدرس ${index + 1}`;
    switchLectureTab('video');
    // Reset HW UI
    document.getElementById('hw-intro')?.classList.remove('hidden');
    document.getElementById('hw-solve')?.classList.add('hidden');
    document.getElementById('hw-result')?.classList.add('hidden');
    switchView('lecture-view');
}

function backToCourseDetails() {
    openCourse(state.currentCourseId);
}

function switchLectureTab(id) {
    document.querySelectorAll('#lecture-view .interactive-card').forEach(c => {
        c.classList.remove('active-tab', 'border-customPrimary');
        c.classList.add('border-transparent');
    });
    document.querySelectorAll('#lecture-view .tab-content').forEach(c => {
        c.classList.add('hidden');
        c.classList.remove('flex');
    });
    const tb = document.getElementById('tab-' + id);
    if (tb) {
        tb.classList.add('active-tab');
        tb.classList.replace('border-transparent', 'border-customPrimary');
    }
    const ct = document.getElementById('content-' + id);
    if (ct) {
        ct.classList.remove('hidden');
        if (id !== 'hw') ct.classList.add('flex');
    }
    state.currentLectureTab = id;
    loadLectureMedia(id);

    // Solution lock check
    if (id === 'solution') {
        const key = `${state.currentCourseId}_${state.currentLectureIndex}`;
        const unlocked = !!state.user.solutionUnlocked[key];
        const lockedEl = document.getElementById('solution-locked');
        const videoEl = document.getElementById('solution-video');
        if (lockedEl && videoEl) {
            if (unlocked) {
                lockedEl.classList.add('hidden');
                videoEl.classList.remove('hidden');
            } else {
                lockedEl.classList.remove('hidden');
                videoEl.classList.add('hidden');
            }
        }
    }
}

function nextLecture() {
    const c = db.courses.find(x => x.id === state.currentCourseId);
    if (!c || !c.lessons) return;
    if (state.currentLectureIndex < c.lessons.length - 1) {
        startLec(state.currentLectureIndex + 1);
    } else {
        showToast(state.lang === 'ar' ? 'هذا آخر درس' : 'This is the last lesson');
    }
}

function finishLecture() {
    const key = `${state.currentCourseId}_${state.currentLectureIndex}`;
    state.user.finishedLectures[key] = true;
    state.user.watchHistory.push({
        courseId: state.currentCourseId,
        lesson: state.currentLectureIndex,
        title: document.getElementById('current-lecture-title')?.innerText,
        time: new Date().toLocaleString()
    });
    trackProgress('lecture', {
        key,
        courseId: state.currentCourseId,
        lesson: state.currentLectureIndex,
        title: document.getElementById('current-lecture-title')?.innerText || ''
    });
    addActivity(`أنهى محاضرة: ${document.getElementById('current-lecture-title')?.innerText}`);
    showToast(state.lang === 'ar' ? 'تم إنهاء الدرس بنجاح!' : 'Lecture finished!');
    backToCourseDetails();
}

// ==================== HOMEWORK SOLVING ====================
let hwState = { questions: [], current: 0, answers: {} };

function startHWSolve() {
    const c = db.courses.find(x => x.id === state.currentCourseId);
    const lec = c?.lessons?.[state.currentLectureIndex];
    const qs = lec?.questions || [];
    if (qs.length === 0) {
        showToast(state.lang === 'ar' ? 'لا يوجد واجب لهذا الدرس' : 'No homework for this lesson', true);
        return;
    }
    hwState = { questions: qs, current: 0, answers: {} };
    document.getElementById('hw-intro').classList.add('hidden');
    document.getElementById('hw-solve').classList.remove('hidden');
    document.getElementById('hw-result').classList.add('hidden');
    renderHWQuestion();
}

function renderHWQuestion() {
    const q = hwState.questions[hwState.current];
    if (!q) return;
    document.getElementById('hw-q-counter').textContent = `${state.lang === 'ar' ? 'السؤال' : 'Question'} ${hwState.current + 1} / ${hwState.questions.length}`;
    document.getElementById('hw-q-text').textContent = q.text;
    const opts = document.getElementById('hw-opts');
    opts.innerHTML = '';
    q.options.forEach((opt, i) => {
        const selected = hwState.answers[hwState.current] === i;
        opts.innerHTML += `
            <button onclick="selectHWOption(${i})" class="hw-option w-full text-start p-3 rounded-xl border border-slate-200/30 hover:border-customPrimary transition-all ${selected ? 'selected' : ''}">
                <span class="font-bold me-2">${String.fromCharCode(65 + i)}.</span> ${opt}
            </button>`;
    });
    document.getElementById('hw-prev-btn').disabled = hwState.current === 0;
    const nextBtn = document.getElementById('hw-next-btn');
    nextBtn.textContent = hwState.current === hwState.questions.length - 1 ? t('submitHW') : t('next');
}

function selectHWOption(i) {
    hwState.answers[hwState.current] = i;
    renderHWQuestion();
}

function hwPrevQ() {
    if (hwState.current > 0) {
        hwState.current--;
        renderHWQuestion();
    }
}

function hwNextQ() {
    if (hwState.answers[hwState.current] === undefined) {
        return showToast(state.lang === 'ar' ? 'اختر إجابة أولاً' : 'Select an answer first', true);
    }
    if (hwState.current < hwState.questions.length - 1) {
        hwState.current++;
        renderHWQuestion();
    } else {
        // Submit
        let correct = 0;
        hwState.questions.forEach((q, i) => {
            if (hwState.answers[i] === q.correct) correct++;
        });
        const score = `${correct}/${hwState.questions.length}`;
        const key = `${state.currentCourseId}_${state.currentLectureIndex}`;
        state.user.completedHW[key] = true;
        state.user.hwGrades[key] = score;
        state.user.solutionUnlocked[key] = true;
        trackProgress('hw', { key, correct, total: hwState.questions.length });

        document.getElementById('hw-solve').classList.add('hidden');
        document.getElementById('hw-result').classList.remove('hidden');
        document.getElementById('hw-result-score').textContent = score;
        addActivity(`حل واجب: ${score}`);
        showToast(state.lang === 'ar' ? `نتيجتك: ${score}` : `Your score: ${score}`);
    }
}

// ==================== COURSE BUILDER (Teacher) ====================
function renderInstCourses() {
    const g = document.getElementById('inst-courses-grid');
    if (!g) return;
    let html = '';
    db.courses.forEach(c => {
        const logoHtml = c.logo
            ? `<img src="${c.logo}" class="w-16 h-16 mx-auto mb-4 relative z-10 object-contain">`
            : `<div class="w-16 h-16 mx-auto mb-4 rounded-xl bg-customPrimary/15 flex items-center justify-center text-2xl font-black text-customPrimary">${c.name[0]}</div>`;
        html += `
            <div class="bg-customCard p-5 rounded-2xl border border-slate-200/20 shadow-sm flex flex-col justify-between text-center relative overflow-hidden group">
                ${logoHtml}
                <h3 class="text-xl font-bold mb-1 relative z-10" dir="ltr">${c.name}</h3>
                <p class="text-sm opacity-60 mb-2">${c.price} EGP • ${c.lessons?.length || 0} ${state.lang === 'ar' ? 'دروس' : 'lessons'}</p>
                <button onclick="editCourse('${c.id}')" class="w-full px-4 py-2 bg-customPrimary/10 text-customPrimary hover:bg-customPrimary hover:text-white rounded-xl font-bold text-sm transition-colors mt-auto relative z-10">
                    ${state.lang === 'ar' ? 'تعديل الكورس' : 'Edit Course'}
                </button>
            </div>`;
    });
    html += `
        <div onclick="startNewCourse()" class="p-5 rounded-2xl border-2 border-dashed border-customPrimary flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px] hover:bg-customPrimary/5 transition-colors">
            <i class="fas fa-plus text-5xl mb-4 text-customPrimary opacity-80"></i>
            <h3 class="font-bold text-xl text-customPrimary">${t('addCourse')}</h3>
        </div>`;
    g.innerHTML = html;
}

function populateBuilderFaculties() {
    const sel = document.getElementById('builder-course-faculty');
    if (!sel) return;
    sel.innerHTML = FACULTIES.map(f =>
        `<option value="${f.id}">${state.lang === 'ar' ? f.nameAr : f.nameEn} (${f.years})</option>`
    ).join('');
}

function updateBuilderFormFields(preserveYear) {
    const stage = document.getElementById('builder-course-stage')?.value || 'high';
    const facWrap = document.getElementById('builder-faculty-wrap');
    const yearSelect = document.getElementById('builder-course-year');
    const yearWrap = yearSelect ? yearSelect.closest('div') : null;
    if (facWrap) facWrap.classList.toggle('hidden', stage !== 'univ');
    // "للجميع" = يظهر لكل الطلاب بدون سنة أو كلية
    if (yearWrap) yearWrap.classList.toggle('hidden', stage === 'all');
    if (stage === 'all' && facWrap) facWrap.classList.add('hidden');

    if (!yearSelect) return;
    if (stage === 'all') {
        yearSelect.innerHTML = '<option value="all">' + (state.lang === 'ar' ? 'كل السنوات' : 'All years') + '</option>';
        yearSelect.value = 'all';
        return;
    }
    const prevYear = preserveYear != null ? String(preserveYear) : yearSelect.value;
    yearSelect.innerHTML = '';
    let maxYear = 3;
    if (stage === 'univ') {
        const fid = document.getElementById('builder-course-faculty')?.value || 'cs';
        const fac = FACULTIES.find(f => f.id === fid);
        maxYear = fac ? fac.years : 4;
    }
    const arYears = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع'];
    for (let i = 1; i <= maxYear; i++) {
        const opt = document.createElement('option');
        opt.value = String(i);
        if (state.lang === 'ar') {
            opt.textContent = (stage === 'univ' ? 'الفرقة ' : 'الصف ') + (arYears[i - 1] || i);
        } else {
            opt.textContent = 'Year ' + i;
        }
        yearSelect.appendChild(opt);
    }
    if (prevYear && prevYear !== 'all' && Number(prevYear) <= maxYear) {
        yearSelect.value = prevYear;
    }
}

function startNewCourse() {
    currentBuilderCourseId = null;
    builderLessons = [];
    document.getElementById('builder-course-name').value = '';
    document.getElementById('builder-course-price').value = '100';
    document.getElementById('builder-course-stage').value = 'all';
    document.getElementById('builder-course-image').value = '';
    document.getElementById('builder-image-preview').innerHTML = '<i class="fas fa-image opacity-50 text-2xl"></i>';
    populateBuilderFaculties();
    updateBuilderFormFields('all');
    renderBuilderLessons();
    switchView('course-builder-view');
}

function editCourse(id) {
    const c = db.courses.find(x => x.id === id);
    if (!c) return;
    currentBuilderCourseId = id;
    builderLessons = JSON.parse(JSON.stringify(c.lessons || []));
    document.getElementById('builder-course-name').value = c.name;
    document.getElementById('builder-course-price').value = c.price || 100;
    document.getElementById('builder-course-stage').value = c.stage || 'high';
    populateBuilderFaculties();
    if (c.faculty) {
        const facSel = document.getElementById('builder-course-faculty');
        if (facSel) facSel.value = c.faculty;
    }
    updateBuilderFormFields(c.year || '1');
    const prev = document.getElementById('builder-image-preview');
    if (c.logo) {
        prev.innerHTML = `<img src="${c.logo}" class="w-full h-full object-cover rounded-xl">`;
    } else {
        prev.innerHTML = '<i class="fas fa-image opacity-50 text-2xl"></i>';
    }
    renderBuilderLessons();
    switchView('course-builder-view');
}

function builderAddLesson() {
    builderLessons.push({
        title: state.lang === 'ar' ? `الدرس ${builderLessons.length + 1}` : `Lesson ${builderLessons.length + 1}`,
        isExpanded: true,
        explainUrl: '',
        summaryUrl: '',
        solutionUrl: '',
        questions: []
    });
    renderBuilderLessons();
}

function builderToggleLesson(index) {
    builderLessons[index].isExpanded = !builderLessons[index].isExpanded;
    renderBuilderLessons();
}

function builderRemoveLesson(index) {
    if (confirm(state.lang === 'ar' ? 'حذف الدرس؟' : 'Delete lesson?')) {
        builderLessons.splice(index, 1);
        renderBuilderLessons();
    }
}

function builderAddQuestion(lessonIndex) {
    const qText = prompt(state.lang === 'ar' ? 'نص السؤال:' : 'Question text:');
    if (!qText) return;
    const opts = [];
    for (let i = 0; i < 4; i++) {
        const o = prompt(`${state.lang === 'ar' ? 'الاختيار' : 'Option'} ${String.fromCharCode(65 + i)}:`);
        if (!o) return showToast(state.lang === 'ar' ? 'يجب إدخال 4 اختيارات' : 'Need 4 options', true);
        opts.push(o);
    }
    const correct = parseInt(prompt(state.lang === 'ar' ? 'رقم الإجابة الصحيحة (0-3):' : 'Correct answer index (0-3):'), 10);
    if (isNaN(correct) || correct < 0 || correct > 3) return showToast('Invalid correct index', true);

    builderLessons[lessonIndex].questions.push({ text: qText, options: opts, correct });
    builderLessons[lessonIndex].isExpanded = true;
    renderBuilderLessons();
    showToast(state.lang === 'ar' ? 'تم إضافة السؤال' : 'Question added');
}

function renderBuilderLessons() {
    const container = document.getElementById('builder-lessons-container');
    if (!container) return;
    if (builderLessons.length === 0) {
        container.innerHTML = `<div class="text-center p-6 border-2 border-dashed border-slate-200/30 rounded-xl opacity-60 font-bold text-sm">${t('noLessons')}</div>`;
        return;
    }

    container.innerHTML = builderLessons.map((lesson, lIndex) => `
        <div class="lesson-block bg-black/5 dark:bg-white/5 rounded-xl overflow-hidden transition-all duration-300">
            <div class="lesson-header flex justify-between items-center p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5" onclick="builderToggleLesson(${lIndex})">
                <div class="flex items-center gap-3 flex-1" onclick="event.stopPropagation()">
                    <i class="fas fa-chevron-${lesson.isExpanded ? 'up' : 'down'} text-customPrimary opacity-70"></i>
                    <input type="text" class="bg-transparent border-b border-slate-200/30 focus:border-customPrimary outline-none font-bold w-1/2 md:w-2/5 pb-1" 
                        value="${escHtml(lesson.title)}" onchange="builderLessons[${lIndex}].title = this.value" onclick="event.stopPropagation()">
                </div>
                <div class="flex gap-2" onclick="event.stopPropagation()">
                    <button onclick="builderAddQuestion(${lIndex})" class="text-xs bg-amber-500 text-white px-3 py-1.5 rounded flex items-center gap-1 hover:bg-amber-600 shadow-sm">
                        <i class="fas fa-question-circle"></i> <span class="hidden sm:inline">${t('addQuestion')}</span>
                    </button>
                    <button onclick="builderRemoveLesson(${lIndex})" class="text-xs bg-red-500/80 text-white px-2 py-1.5 rounded hover:bg-red-600">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="${lesson.isExpanded ? 'block' : 'hidden'} p-4 space-y-4 bg-customCard/40 border-t border-slate-200/10">
                <!-- 4 content slots -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${builderSlotHtml(lIndex, lesson, 'explain', t('videoExplain'), 'YouTube / Video URL', 'video/*')}
                    ${builderSlotHtml(lIndex, lesson, 'summary', t('videoSummary'), 'Summary Video / PDF URL', 'video/*,application/pdf')}
                    ${builderSlotHtml(lIndex, lesson, 'solution', t('videoSolution'), 'Solution Video URL', 'video/*')}
                    <div>
                        <label class="text-xs font-bold opacity-70 mb-1 block">${t('homework')} (${lesson.questions?.length || 0} ${state.lang === 'ar' ? 'أسئلة' : 'Q'})</label>
                        <button onclick="builderAddQuestion(${lIndex})" class="w-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-lg px-3 py-2 text-sm font-bold hover:bg-amber-500/25">
                            <i class="fas fa-plus me-1"></i> ${t('addQuestion')}
                        </button>
                    </div>
                </div>
                ${lesson.questions && lesson.questions.length > 0 ? `
                    <div class="space-y-2 mt-2">
                        <p class="text-xs font-bold opacity-60">${state.lang === 'ar' ? 'الأسئلة المضافة:' : 'Added questions:'}</p>
                        ${lesson.questions.map((q, qi) => `
                            <div class="flex justify-between items-center bg-black/5 dark:bg-white/5 rounded-lg px-3 py-2 text-sm">
                                <span class="truncate flex-1">${qi + 1}. ${q.text}</span>
                                <button onclick="builderLessons[${lIndex}].questions.splice(${qi},1); renderBuilderLessons();" class="text-red-400 hover:text-red-500 ms-2"><i class="fas fa-times"></i></button>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function onBuilderImageChange(input) {
    const file = input.files?.[0];
    const prev = document.getElementById('builder-image-preview');
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            prev.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover rounded-xl">`;
            prev.dataset.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function saveAndPublishCourse() {
    if (pendingUploads > 0) return showToast(state.lang === 'ar' ? 'استنى لحد ما رفع الفيديو يخلص' : 'Wait for the upload to finish', true);
    const nameEl = document.getElementById('builder-course-name');
    const priceEl = document.getElementById('builder-course-price');
    if (!nameEl || !nameEl.value.trim()) return showToast(state.lang === 'ar' ? 'يرجى إدخال اسم الكورس' : 'Enter course name', true);
    const price = parseInt(priceEl?.value || '100', 10);
    if (isNaN(price) || price < 0) return showToast(state.lang === 'ar' ? 'سعر غير صحيح' : 'Invalid price', true);

    const stage = document.getElementById('builder-course-stage').value;
    const year = document.getElementById('builder-course-year').value;
    const faculty = stage === 'univ'
        ? (document.getElementById('builder-course-faculty')?.value || '')
        : '';
    const prev = document.getElementById('builder-image-preview');
    const logo = prev.dataset.src || null;

    const courseData = {
        name: nameEl.value.trim(),
        desc: state.lang === 'ar' ? 'كورس مضاف حديثاً' : 'Newly added course',
        price,
        stage,
        year,
        faculty,
        logo: logo || null,
        lessons: builderLessons.map(l => ({
            title: l.title,
            explainUrl: l.explainUrl || '',
            summaryUrl: l.summaryUrl || '',
            solutionUrl: l.solutionUrl || '',
            explainName: l.explainName || '',
            summaryName: l.summaryName || '',
            solutionName: l.solutionName || '',
            questions: l.questions || []
        }))
    };

    if (currentBuilderCourseId) {
        const idx = db.courses.findIndex(c => c.id === currentBuilderCourseId);
        if (idx >= 0) {
            db.courses[idx] = { ...db.courses[idx], ...courseData };
        }
    } else {
        courseData.id = 'c_' + Date.now();
        db.courses.unshift(courseData);
    }

    showToast(state.lang === 'ar' ? 'تم نشر الكورس بنجاح!' : 'Course published successfully!');
    saveToStorage();
    addActivity(`نشر كورس: ${courseData.name}`);
    renderInstCourses();
    renderSuggested();
    switchView('inst-courses-view');
}

// ==================== STUDENTS ====================
let studentFilter = { level: 'all', year: 'all', faculty: 'all' };

function setStudentFilter(key, value) {
    studentFilter[key] = value;
    if (key === 'level') {
        studentFilter.year = 'all';
        studentFilter.faculty = 'all';
    }
    if (key === 'faculty') {
        studentFilter.year = 'all';
    }
    renderStudents();
}

function renderStudents() {
    const container = document.getElementById('students-list');
    const filtersEl = document.getElementById('students-filters');
    if (!container) return;

    // Also try load from Firestore if available
    if (window.firebaseApp && state.user.role === 'teacher') {
        firebase.firestore().collection('users').where('role', '==', 'student').get()
            .then(snap => {
                const list = [];
                snap.forEach(doc => {
                    const d = doc.data();
                    list.push({ id: doc.id, ...d, joined: d.createdAt?.toDate?.()?.toISOString?.()?.slice(0,10) || '' });
                });
                if (list.length) db.students = list;
                _renderStudentsUI(container, filtersEl);
            })
            .catch(() => _renderStudentsUI(container, filtersEl));
    } else {
        _renderStudentsUI(container, filtersEl);
    }
}

function _renderStudentsUI(container, filtersEl) {
    // Filters UI
    if (filtersEl) {
        const levels = [
            { id: 'all', ar: 'كل الفئات', en: 'All levels' },
            { id: 'univ', ar: 'جامعي', en: 'University' },
            { id: 'high', ar: 'ثانوي', en: 'High School' },
            { id: 'middle', ar: 'إعدادي', en: 'Middle School' }
        ];
        let html = '<div class="flex flex-wrap gap-2 mb-3">';
        levels.forEach(l => {
            const active = studentFilter.level === l.id ? 'active' : '';
            html += `<button class="filter-chip ${active}" onclick="setStudentFilter('level','${l.id}')">${state.lang==='ar'?l.ar:l.en}</button>`;
        });
        html += '</div>';

        // Year chips only when a specific level is selected (not "كل الفئات")
        // إعدادي / ثانوي: years 1–3 only. جامعي: years by faculty (or up to 7 if all faculties).
        if (studentFilter.level !== 'all') {
            let maxY = 3;
            if (studentFilter.level === 'univ') {
                if (studentFilter.faculty !== 'all') {
                    const fac = FACULTIES.find(f => f.id === studentFilter.faculty);
                    maxY = fac ? fac.years : 4;
                } else {
                    maxY = 7;
                }
            }
            html += '<div class="flex flex-wrap gap-2 mb-3">';
            html += `<button class="filter-chip ${studentFilter.year==='all'?'active':''}" onclick="setStudentFilter('year','all')">${state.lang==='ar'?'كل السنوات':'All years'}</button>`;
            for (let y = 1; y <= maxY; y++) {
                html += `<button class="filter-chip ${studentFilter.year==String(y)?'active':''}" onclick="setStudentFilter('year','${y}')">${state.lang==='ar'?'سنة '+y:'Year '+y}</button>`;
            }
            html += '</div>';
        }

        // Faculty chips for univ
        if (studentFilter.level === 'univ') {
            html += '<div class="flex flex-wrap gap-2 mb-4 max-h-24 overflow-y-auto">';
            html += `<button class="filter-chip ${studentFilter.faculty==='all'?'active':''}" onclick="setStudentFilter('faculty','all')">${state.lang==='ar'?'كل الكليات':'All faculties'}</button>`;
            FACULTIES.slice(0,12).forEach(f => {
                html += `<button class="filter-chip ${studentFilter.faculty===f.id?'active':''}" onclick="setStudentFilter('faculty','${f.id}')">${state.lang==='ar'?f.nameAr:f.nameEn}</button>`;
            });
            html += '</div>';
        }
        filtersEl.innerHTML = html;
    }

    let list = db.students.slice();
    if (studentFilter.level !== 'all') list = list.filter(s => s.level === studentFilter.level);
    if (studentFilter.year !== 'all') list = list.filter(s => String(s.year) === String(studentFilter.year));
    if (studentFilter.faculty !== 'all') list = list.filter(s => s.faculty === studentFilter.faculty);

    if (list.length === 0) {
        container.innerHTML = `<p class="text-center opacity-60 py-8">${t('noStudents')}</p>`;
        return;
    }
    container.innerHTML = list.map(s => {
        const p = getStudentProgress(s);
        const st = computeStudentStats(s, p);
        return `
        <div onclick="openStudentDetail('${s.id}')" class="student-row bg-customCard p-4 rounded-xl border border-slate-200/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
                <div class="w-11 h-11 rounded-full bg-customPrimary/15 text-customPrimary flex items-center justify-center font-black shrink-0">${escHtml((s.name||'?')[0])}</div>
                <div class="min-w-0">
                    <h4 class="font-bold text-base truncate">${escHtml(s.name)}</h4>
                    <p class="text-xs opacity-60 truncate">${escHtml(s.email || '')}</p>
                    <p class="text-xs opacity-50 mt-0.5">
                        ${levelLabel(s.level)}${s.level === 'univ' && s.faculty ? ' • ' + getFacultyName(s.faculty) : ''}
                        • ${state.lang==='ar'?'سنة':'Year'} ${s.year || '-'}
                    </p>
                </div>
            </div>
            <div class="flex items-center gap-2 flex-wrap sm:justify-end">
                ${statusChip(st.status)}
                <span class="text-xs bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-full font-bold"><i class="fas fa-play-circle me-1 text-blue-500"></i>${st.watched}/${st.totalLessons}</span>
                <span class="text-xs bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-full font-bold"><i class="fas fa-tasks me-1 text-amber-500"></i>${st.hwDone}/${st.hwTotal}</span>
                <i class="fas fa-chevron-left rtl:rotate-0 ltr:rotate-180 text-xs opacity-40"></i>
            </div>
        </div>`;
    }).join('');
}

// ==================== COMMUNITY ====================
let activeCommunityId = 'general';

function renderCommunity() {
    const joinBtn = document.getElementById('join-community-btn');
    if (joinBtn) {
        joinBtn.classList.toggle('hidden', state.user.role === 'teacher' || state.user.joinedCommunity);
    }
    const createWrap = document.getElementById('community-create-wrap');
    if (createWrap) {
        createWrap.classList.toggle('hidden', state.user.role !== 'teacher');
    }

    // Tabs
    const tabs = document.getElementById('community-tabs');
    if (tabs) {
        tabs.innerHTML = (db.communities || []).map(c => {
            const name = state.lang === 'ar' ? c.nameAr : c.nameEn;
            const active = (c.id === activeCommunityId) ? 'active' : '';
            return `<button class="filter-chip ${active}" onclick="setActiveCommunity('${c.id}')">${name}</button>`;
        }).join('');
    }

    const list = document.getElementById('community-posts');
    if (!list) return;
    const posts = (db.communityPosts || []).filter(p => (p.communityId || 'general') === activeCommunityId);
    if (posts.length === 0) {
        list.innerHTML = `<p class="text-center opacity-50 py-8 text-sm">${state.lang==='ar'?'لا توجد منشورات بعد':'No posts yet'}</p>`;
        return;
    }
    const teacherTag = state.lang === 'ar' ? '(معلم)' : '(Teacher)';
    list.innerHTML = posts.map(p => `
        <div class="bg-customCard p-4 rounded-xl border border-slate-200/20">
            <div class="flex items-center gap-2 mb-2">
                <div class="w-8 h-8 rounded-full bg-customPrimary/20 text-customPrimary flex items-center justify-center text-sm font-bold">${(p.author||'?')[0]}</div>
                <div>
                    <p class="font-bold text-sm">${p.author} ${p.role === 'teacher' ? '<span class="text-xs text-customPrimary">'+teacherTag+'</span>' : ''}</p>
                    <p class="text-xs opacity-50">${p.time}</p>
                </div>
            </div>
            <p class="text-sm leading-relaxed">${p.text}</p>
        </div>
    `).join('');
}

function setActiveCommunity(id) {
    activeCommunityId = id;
    renderCommunity();
}

function createCommunity() {
    if (state.user.role !== 'teacher') return;
    const nameAr = prompt(state.lang === 'ar' ? 'اسم المجتمع (عربي):' : 'Community name (Arabic):');
    if (!nameAr || !nameAr.trim()) return;
    const nameEn = prompt(state.lang === 'ar' ? 'اسم المجتمع (إنجليزي):' : 'Community name (English):') || nameAr;
    const id = 'c_' + Date.now();
    db.communities.push({ id, nameAr: nameAr.trim(), nameEn: nameEn.trim(), isDefault: false });
    activeCommunityId = id;
    saveToStorage();
    renderCommunity();
    showToast(state.lang === 'ar' ? 'تم إنشاء المجتمع' : 'Community created');
}

function joinCommunity() {
    state.user.joinedCommunity = true;
    showToast(state.lang === 'ar' ? 'انضممت للمجتمع!' : 'Joined community!');
    addActivity('انضم للمجتمع');
}

function postToCommunity() {
    const input = document.getElementById('community-post-input');
    if (!input || !input.value.trim()) return;
    if (state.user.role !== 'teacher' && !state.user.joinedCommunity) {
        return showToast(state.lang === 'ar' ? 'انضم للمجتمع أولاً' : 'Join community first', true);
    }
    // teacher always allowed
    db.communityPosts.unshift({
        id: Date.now(),
        communityId: activeCommunityId || 'general',
        author: state.user.name,
        role: state.user.role,
        text: input.value.trim(),
        time: new Date().toLocaleDateString()
    });
    input.value = '';
    renderCommunity();
    saveToStorage();
    showToast(state.lang === 'ar' ? 'تم النشر' : 'Posted');
}

// ==================== RECORDS & STATS ====================
function renderRecords() {
    const watch = document.getElementById('watch-history-list');
    const hw = document.getElementById('hw-history-list');
    if (watch) {
        if (state.user.watchHistory.length === 0) {
            watch.innerHTML = `<p class="opacity-50 text-sm py-4">${state.lang === 'ar' ? 'لا يوجد سجل مشاهدة' : 'No watch history'}</p>`;
        } else {
            watch.innerHTML = state.user.watchHistory.slice().reverse().map(h => `
                <div class="flex justify-between items-center py-2 border-b border-slate-200/10 text-sm">
                    <span>${h.title || 'درس'}</span>
                    <span class="opacity-50 text-xs">${h.time}</span>
                </div>
            `).join('');
        }
    }
    if (hw) {
        const grades = Object.entries(state.user.hwGrades);
        if (grades.length === 0) {
            hw.innerHTML = `<p class="opacity-50 text-sm py-4">${state.lang === 'ar' ? 'لا يوجد سجل واجبات' : 'No homework records'}</p>`;
        } else {
            hw.innerHTML = grades.map(([k, score]) => `
                <div class="flex justify-between items-center py-2 border-b border-slate-200/10 text-sm">
                    <span>${k}</span>
                    <span class="font-bold text-customPrimary">${score}</span>
                </div>
            `).join('');
        }
    }
}

function renderStats() {
    const totalLessons = db.courses.reduce((acc, c) => acc + (c.lessons?.length || 0), 0) || 1;
    const finished = Object.keys(state.user.finishedLectures).length;
    const hwDone = Object.keys(state.user.completedHW).length;
    const progress = Math.min(100, Math.round((finished / totalLessons) * 100));

    const pBar = document.getElementById('stat-progress-bar');
    const pText = document.getElementById('stat-progress-text');
    if (pBar) pBar.style.width = progress + '%';
    if (pText) pText.textContent = progress + '%';

    const vEl = document.getElementById('stat-views');
    if (vEl) vEl.textContent = finished;
    const hEl = document.getElementById('stat-hw');
    if (hEl) hEl.textContent = hwDone;

    // Simple chart if canvas exists
    const canvas = document.getElementById('chartOverall');
    if (canvas && typeof Chart !== 'undefined') {
        if (state.chartInstances.overall) state.chartInstances.overall.destroy();
        state.chartInstances.overall = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: [state.lang === 'ar' ? 'مكتمل' : 'Done', state.lang === 'ar' ? 'متبقي' : 'Left'],
                datasets: [{
                    data: [finished, Math.max(0, totalLessons - finished)],
                    backgroundColor: ['#6d28d9', 'rgba(148,163,184,0.3)'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
}

// ==================== ACTIVITY ====================
function addActivity(text) {
    state.user.activity.unshift({ text, time: new Date().toLocaleTimeString() });
    if (state.user.activity.length > 20) state.user.activity.pop();
    renderActivity();
}

function renderActivity() {
    const list = document.getElementById('activity-list');
    if (!list) return;
    if (state.user.activity.length === 0) {
        list.innerHTML = `<p class="text-sm opacity-50 text-center py-4">${t('noActivity')}</p>`;
        return;
    }
    list.innerHTML = state.user.activity.map(a => `
        <div class="flex items-start gap-2 text-sm">
            <i class="fas fa-circle text-[6px] mt-1.5 text-customPrimary"></i>
            <div>
                <p class="font-medium">${a.text}</p>
                <p class="text-xs opacity-50">${a.time}</p>
            </div>
        </div>
    `).join('');
}

// ==================== CUSTOMIZER ====================
function openCustomizer() {
    openModal('customizer-modal');
}

function setPrimaryColor(color) {
    document.documentElement.style.setProperty('--primary-color', color);
    localStorage.setItem('fikra-primary', color);
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    event?.target?.classList.add('active');
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('fikra-theme', isDark ? 'dark' : 'light');
    updateThemeToggleUI();
}

function updateThemeToggleUI() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        btn.innerHTML = '<i class="fas fa-sun me-1"></i> <span>' + (state.lang==='ar'?'الوضع الفاتح':'Light Mode') + '</span>';
    } else {
        btn.innerHTML = '<i class="fas fa-moon me-1"></i> <span>' + (state.lang==='ar'?'الوضع الداكن':'Dark Mode') + '</span>';
    }
}

// Expose some functions for HTML onclick

// ==================== LIBRARY (BOOKS) ====================
function renderLibrary() {
    const grid = document.getElementById('library-grid');
    const empty = document.getElementById('library-empty');
    const addPanel = document.getElementById('library-add-panel');
    if (!grid) return;

    if (state.user.role === 'teacher' && addPanel) {
        addPanel.classList.remove('hidden');
    } else if (addPanel) {
        addPanel.classList.add('hidden');
    }

    let books = db.books.slice();
    // Students only see books matching their level/year (and faculty if univ)
    if (state.user.role === 'student' && state.user.level) {
        books = books.filter(b => {
            if (b.level !== state.user.level) return false;
            if (b.year && state.user.year && String(b.year) !== String(state.user.year)) return false;
            if (b.level === 'univ' && b.faculty && state.user.faculty && b.faculty !== state.user.faculty) return false;
            return true;
        });
    }

    if (books.length === 0) {
        grid.innerHTML = '';
        if (empty) empty.classList.remove('hidden');
        return;
    }
    if (empty) empty.classList.add('hidden');

    grid.innerHTML = books.map(b => {
        const owned = (state.user.ownedBooks || []).includes(b.id) || state.user.role === 'teacher';
        const facLabel = b.faculty ? ' • ' + getFacultyName(b.faculty) : '';
        return `
        <div class="bg-customCard p-5 rounded-2xl border border-slate-200/20 shadow-sm flex flex-col gap-3">
            <div class="flex items-start gap-3">
                <div class="w-12 h-12 rounded-xl bg-red-500/15 text-red-500 flex items-center justify-center text-xl shrink-0">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-base truncate">${b.title}</h3>
                    <p class="text-xs opacity-60 mt-0.5">${b.level} / ${state.lang==='ar'?'سنة':'Y'} ${b.year}${facLabel}</p>
                </div>
            </div>
            <div class="flex items-center justify-between mt-auto pt-2 border-t border-slate-200/10">
                <span class="font-black text-customPrimary">${b.price} EGP</span>
                ${owned
                    ? `<button onclick="downloadBook('${b.id}')" class="px-4 py-2 rounded-xl bg-green-500/15 text-green-600 dark:text-green-400 font-bold text-sm"><i class="fas fa-download me-1"></i>${state.lang==='ar'?'تحميل':'Download'}</button>`
                    : `<button onclick="buyBook('${b.id}',${b.price})" class="px-4 py-2 rounded-xl bg-customPrimary text-white font-bold text-sm">${state.lang==='ar'?'شراء':'Buy'}</button>`
                }
                ${state.user.role === 'teacher' ? `<button onclick="deleteBook('${b.id}')" class="text-red-400 hover:text-red-500 p-2"><i class="fas fa-trash"></i></button>` : ''}
            </div>
        </div>`;
    }).join('');
}

function buyBook(id, price) {
    if (state.user.wallet < price) return showToast(state.lang === 'ar' ? 'الرصيد غير كافٍ' : 'Insufficient balance', true);
    state.user.wallet -= price;
    if (!state.user.ownedBooks) state.user.ownedBooks = [];
    state.user.ownedBooks.push(id);
    updateWalletUI();
    renderLibrary();
    addActivity((state.lang==='ar'?'شراء كتاب: ':'Bought book: ') + (db.books.find(b=>b.id===id)?.title || id));
    showToast(state.lang === 'ar' ? 'تم الشراء! يمكنك التحميل الآن' : 'Purchased! You can download now');
    saveToStorage();
}

function downloadBook(id) {
    const b = db.books.find(x => x.id === id);
    showToast(state.lang === 'ar' ? `تحميل: ${b?.title || id} (تجريبي)` : `Download: ${b?.title || id} (demo)`);
}

function deleteBook(id) {
    if (!confirm(state.lang === 'ar' ? 'حذف الكتاب؟' : 'Delete book?')) return;
    db.books = db.books.filter(b => b.id !== id);
    renderLibrary();
    showToast(state.lang === 'ar' ? 'تم الحذف' : 'Deleted');
    saveToStorage();
}

function addLibraryBook() {
    const title = document.getElementById('lib-title')?.value.trim();
    const level = document.getElementById('lib-level')?.value;
    const year = document.getElementById('lib-year')?.value;
    const faculty = document.getElementById('lib-faculty')?.value || '';
    const price = parseInt(document.getElementById('lib-price')?.value || '20', 10);
    const fileInput = document.getElementById('lib-file');

    if (!title) return showToast(state.lang === 'ar' ? 'أدخل اسم المادة/الكتاب' : 'Enter book title', true);
    if (isNaN(price) || price < 0) return showToast(state.lang === 'ar' ? 'سعر غير صحيح' : 'Invalid price', true);

    const fileName = fileInput?.files?.[0]?.name || (title.replace(/\s+/g, '_') + '.pdf');

    db.books.unshift({
        id: 'b_' + Date.now(),
        title,
        level,
        year,
        faculty: level === 'univ' ? faculty : '',
        price,
        fileName,
        addedBy: state.user.name
    });

    document.getElementById('lib-title').value = '';
    if (fileInput) fileInput.value = '';
    renderLibrary();
    addActivity((state.lang==='ar'?'إضافة كتاب: ':'Added book: ') + title);
    showToast(state.lang === 'ar' ? 'تم إضافة الكتاب' : 'Book added');
    saveToStorage();
}

function updateLibFormFields() {
    const level = document.getElementById('lib-level')?.value || 'high';
    const facWrap = document.getElementById('lib-faculty-wrap');
    const yearSel = document.getElementById('lib-year');
    if (facWrap) facWrap.classList.toggle('hidden', level !== 'univ');
    if (!yearSel) return;
    let maxY = level === 'univ' ? 4 : 3;
    if (level === 'univ') {
        const fid = document.getElementById('lib-faculty')?.value;
        const fac = FACULTIES.find(f => f.id === fid);
        if (fac) maxY = fac.years;
    }
    yearSel.innerHTML = '';
    for (let i = 1; i <= maxY; i++) {
        const opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = (state.lang === 'ar' ? 'سنة ' : 'Year ') + i;
        yearSel.appendChild(opt);
    }
}

function populateLibFaculties() {
    const sel = document.getElementById('lib-faculty');
    if (!sel) return;
    sel.innerHTML = FACULTIES.map(f =>
        `<option value="${f.id}">${state.lang === 'ar' ? f.nameAr : f.nameEn}</option>`
    ).join('');
}

window.renderLibrary = renderLibrary;
window.buyBook = buyBook;
window.downloadBook = downloadBook;
window.deleteBook = deleteBook;
window.addLibraryBook = addLibraryBook;
window.updateLibFormFields = updateLibFormFields;
window.populateLibFaculties = populateLibFaculties;

// ==================== MESSAGING (DM) ====================
let activeDmStudentId = null;

function renderDMStudents() {
    const list = document.getElementById('dm-students-list');
    if (!list) return;
    const students = db.students || [];
    if (students.length === 0) {
        list.innerHTML = `<p class="text-center opacity-50 text-sm py-8">${state.lang==='ar'?'لا يوجد طلاب':'No students yet'}</p>`;
        return;
    }
    list.innerHTML = students.map(s => `
        <button onclick="openDM('${s.id}')" class="w-full text-start px-3 py-3 hover:bg-black/5 dark:hover:bg-white/5 border-b border-slate-200/10 flex items-center gap-3 ${activeDmStudentId===s.id?'bg-customPrimary/10':''}">
            <div class="w-9 h-9 rounded-full bg-customPrimary/20 text-customPrimary flex items-center justify-center font-bold text-sm shrink-0">${(s.name||'?')[0]}</div>
            <div class="min-w-0 flex-1">
                <p class="font-bold text-sm truncate">${s.name}</p>
                <p class="text-xs opacity-50 truncate">${levelLabel(s.level)} • ${state.lang==='ar'?'سنة':'Y'} ${s.year||'-'}</p>
            </div>
        </button>
    `).join('');
}

function openDM(studentId) {
    activeDmStudentId = studentId;
    const s = db.students.find(x => x.id === studentId);
    const nameEl = document.getElementById('dm-active-name');
    if (nameEl) nameEl.textContent = s ? s.name : '';
    const input = document.getElementById('dm-input');
    const btn = document.getElementById('dm-send-btn');
    if (input) { input.disabled = false; input.placeholder = state.lang==='ar'?'اكتب رسالة...':'Type a message...'; }
    if (btn) { btn.disabled = false; }
    renderDMStudents();
    renderDMChat();
    const v = document.getElementById('inst-messages-view');
    if (v) v.classList.add('dm-chat-open');
}

function closeDMChat() {
    const v = document.getElementById('inst-messages-view');
    if (v) v.classList.remove('dm-chat-open');
}

function escHtml(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function renderDMChat() {
    const area = document.getElementById('dm-chat-area');
    if (!area || !activeDmStudentId) return;
    const msgs = (db.messages[activeDmStudentId] || []);
    if (msgs.length === 0) {
        area.innerHTML = `<p class="text-center opacity-40 text-sm py-8">${state.lang==='ar'?'ابدأ المحادثة':'Start the conversation'}</p>`;
        return;
    }
    area.innerHTML = msgs.map(m => `
        <div class="flex ${m.from==='teacher'?'justify-start':'justify-end'}">
            <div class="max-w-[85%] sm:max-w-[75%] break-words px-4 py-2 rounded-2xl text-sm ${m.from==='teacher'?'bg-customPrimary/15 text-customText':'bg-customPrimary text-white'}">
                ${escHtml(m.text)}
                <p class="text-[10px] opacity-50 mt-1">${m.time}</p>
            </div>
        </div>
    `).join('');
    area.scrollTop = area.scrollHeight;
}

function sendDM() {
    const input = document.getElementById('dm-input');
    if (!input || !input.value.trim() || !activeDmStudentId) return;
    if (!db.messages[activeDmStudentId]) db.messages[activeDmStudentId] = [];
    db.messages[activeDmStudentId].push({
        from: state.user.role === 'teacher' ? 'teacher' : 'student',
        text: input.value.trim(),
        time: new Date().toLocaleTimeString()
    });
    input.value = '';
    saveToStorage();
    renderDMChat();
}

window.setActiveCommunity = setActiveCommunity;
window.createCommunity = createCommunity;
window.renderDMStudents = renderDMStudents;
window.openDM = openDM;
window.sendDM = sendDM;
window.closeDMChat = closeDMChat;
window.toggleLanguage = toggleLanguage;
window.cycleMotivation = cycleMotivation;
window.switchView = switchView;
window.goToDashboard = goToDashboard;
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleMobileSidebar = toggleMobileSidebar;
window.closeMobileSidebar = closeMobileSidebar;
window.toggleSidebarCollapse = toggleSidebarCollapse;
window.toggleUserMenu = toggleUserMenu;
window.closeUserMenu = closeUserMenu;
window.openRegister = openRegister;
window.performAuth = performAuth;
window.performLogout = performLogout;
window.testCharge = testCharge;
window.openPayment = openPayment;
window.confirmPayment = confirmPayment;
window.buyCourse = buyCourse;
window.openCourse = openCourse;
window.startLec = startLec;
window.backToCourseDetails = backToCourseDetails;
window.switchLectureTab = switchLectureTab;
window.nextLecture = nextLecture;
window.finishLecture = finishLecture;
window.startHWSolve = startHWSolve;
window.selectHWOption = selectHWOption;
window.hwPrevQ = hwPrevQ;
window.hwNextQ = hwNextQ;
window.builderAddLesson = builderAddLesson;
window.builderToggleLesson = builderToggleLesson;
window.builderRemoveLesson = builderRemoveLesson;
window.builderAddQuestion = builderAddQuestion;
window.renderBuilderLessons = renderBuilderLessons;
window.onBuilderImageChange = onBuilderImageChange;
window.updateBuilderFormFields = updateBuilderFormFields;
window.populateBuilderFaculties = populateBuilderFaculties;
window.saveAndPublishCourse = saveAndPublishCourse;
window.startNewCourse = startNewCourse;
window.editCourse = editCourse;
window.joinCommunity = joinCommunity;
window.postToCommunity = postToCommunity;
window.openCustomizer = openCustomizer;
window.setPrimaryColor = setPrimaryColor;
window.toggleDarkMode = toggleDarkMode;
window.updateRegFormFields = updateRegFormFields;
window.clearNavActive = clearNavActive;
window.setStudentFilter = setStudentFilter;
window.populateFaculties = populateFaculties;
window.updateRegFormFields = updateRegFormFields;


// ==========================================================
// MOBILE SUPPORT (viewport height, drawer gestures, dropdown)
// ==========================================================
(function mobileSupport() {
    const root = document.documentElement;

    // 1) Real visible height (fallback for browsers without 100dvh support)
    function setAppHeight() {
        root.style.setProperty('--app-height', window.innerHeight + 'px');
    }
    if (!(window.CSS && CSS.supports && CSS.supports('height', '100dvh'))) {
        setAppHeight();
        window.addEventListener('resize', setAppHeight);
        window.addEventListener('orientationchange', () => setTimeout(setAppHeight, 200));
    }

    // 2) Leaving mobile width: make sure the drawer overlay doesn't stay on screen
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            const ov = document.getElementById('sidebar-overlay');
            if (ov) ov.classList.remove('active');
        }
    });

    // 3) Close the user dropdown when tapping anywhere else
    document.addEventListener('click', (e) => {
        const dd = document.getElementById('user-dropdown');
        const btn = document.getElementById('user-btn');
        if (!dd || dd.classList.contains('hidden')) return;
        if (dd.contains(e.target) || (btn && btn.contains(e.target))) return;
        dd.classList.add('hidden');
    });

    // 4) Swipe the drawer closed (towards the side it came from) + Esc key
    let startX = null, startY = null;
    const sb = document.getElementById('sidebar');
    if (sb) {
        sb.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        sb.addEventListener('touchend', (e) => {
            if (startX === null || window.innerWidth >= 1024) return;
            const dx = e.changedTouches[0].clientX - startX;
            const dy = e.changedTouches[0].clientY - startY;
            startX = startY = null;
            if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
            const isRTL = document.documentElement.dir === 'rtl';
            if ((isRTL && dx > 0) || (!isRTL && dx < 0)) closeMobileSidebar();
        }, { passive: true });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        closeMobileSidebar();
        ['login-modal', 'reg-modal', 'customizer-modal'].forEach(closeModal);
    });
})();


// ==========================================================
// STUDENT PROGRESS TRACKING + TEACHER'S STUDENT PROFILE
// ==========================================================
function myStudentKey() {
    try {
        if (window.firebaseApp && firebase.auth().currentUser) return firebase.auth().currentUser.uid;
    } catch (e) {}
    const email = (state.user.email || '').toLowerCase();
    const st = (db.students || []).find(x => (x.email || '').toLowerCase() === email);
    return st ? st.id : null;
}

// Records what the logged-in STUDENT does so the teacher can see it later.
function trackProgress(type, p) {
    if (state.user.role !== 'student') return;
    const id = myStudentKey();
    const now = Date.now();

    if (id) {
        const pr = db.progress[id] || (db.progress[id] = { finished: {}, watchLog: [], hw: {}, courses: [], lastActive: 0 });
        pr.lastActive = now;
        if (type === 'lecture') {
            pr.finished[p.key] = now;
            pr.watchLog.push({ courseId: p.courseId, lesson: p.lesson, title: p.title, ts: now });
            if (pr.watchLog.length > 200) pr.watchLog.shift();
        } else if (type === 'hw') {
            pr.hw[p.key] = { correct: p.correct, total: p.total, ts: now };
        } else if (type === 'course') {
            if (!pr.courses.includes(p.id)) pr.courses.push(p.id);
        }
    }

    try {
        if (window.firebaseApp && firebase.auth().currentUser) {
            const FV = firebase.firestore.FieldValue;
            const data = { lastActive: now };
            if (type === 'lecture') {
                data.progress = { finished: { [p.key]: now }, watchLog: FV.arrayUnion({ courseId: p.courseId, lesson: p.lesson, title: p.title, ts: now }) };
            } else if (type === 'hw') {
                data.progress = { hw: { [p.key]: { correct: p.correct, total: p.total, ts: now } } };
            } else if (type === 'course') {
                data.myCourses = FV.arrayUnion(p.id);
                data.wallet = state.user.wallet;
            }
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set(data, { merge: true }).catch(() => {});
        }
    } catch (e) {}
    saveToStorage();
}

function getStudentProgress(s) {
    const a = s.progress || {};
    const b = db.progress[s.id] || {};
    const seen = new Set();
    const watchLog = [...(b.watchLog || []), ...(a.watchLog || [])]
        .filter(w => { const k = w.ts + '|' + w.courseId + '|' + w.lesson; if (seen.has(k)) return false; seen.add(k); return true; })
        .sort((x, y) => y.ts - x.ts);
    return {
        finished: { ...(b.finished || {}), ...(a.finished || {}) },
        hw: { ...(b.hw || {}), ...(a.hw || {}) },
        watchLog,
        courses: [...new Set([...(s.myCourses || []), ...(b.courses || [])])],
        lastActive: Math.max(Number(s.lastActive) || 0, Number(b.lastActive) || 0)
    };
}

function splitLessonKey(key) {
    const i = key.lastIndexOf('_');
    return { courseId: key.slice(0, i), idx: parseInt(key.slice(i + 1), 10) };
}

function computeStudentStats(s, p) {
    const courses = p.courses.map(id => db.courses.find(c => c.id === id)).filter(Boolean);
    const totalLessons = courses.reduce((a, c) => a + (c.lessons?.length || 0), 0);
    const hwTotal = courses.reduce((a, c) => a + (c.lessons || []).filter(l => (l.questions || []).length > 0).length, 0);
    const ids = new Set(courses.map(c => c.id));
    const watched = Object.keys(p.finished).filter(k => ids.has(splitLessonKey(k).courseId)).length;
    const hwEntries = Object.entries(p.hw).filter(([k]) => ids.has(splitLessonKey(k).courseId));
    const hwDone = hwEntries.length;
    const avg = hwDone ? Math.round(hwEntries.reduce((a, [, v]) => a + (v.total ? v.correct / v.total : 0), 0) / hwDone * 100) : null;
    const days = p.lastActive ? Math.floor((Date.now() - p.lastActive) / 864e5) : null;
    let status;
    if (days === null) status = courses.length ? 'late' : 'new';
    else status = days >= 7 ? 'late' : 'active';
    return {
        courses, totalLessons, watched, hwTotal, hwDone, avg, days, status,
        lecturesLeft: Math.max(0, totalLessons - watched),
        hwLeft: Math.max(0, hwTotal - hwDone),
        progress: totalLessons ? Math.round(watched / totalLessons * 100) : 0
    };
}

function statusChip(st) {
    const ar = state.lang === 'ar';
    const map = {
        active: ['bg-green-500/15 text-green-600 dark:text-green-400', ar ? 'نشط' : 'Active', 'fa-circle-check'],
        late:   ['bg-red-500/15 text-red-600 dark:text-red-400', ar ? 'متأخر' : 'Behind', 'fa-triangle-exclamation'],
        new:    ['bg-blue-500/15 text-blue-600 dark:text-blue-400', ar ? 'جديد' : 'New', 'fa-seedling']
    }[st];
    return `<span class="text-xs font-bold px-2.5 py-1 rounded-full ${map[0]}"><i class="fas ${map[2]} me-1"></i>${map[1]}</span>`;
}

function intlPhone(ph) {
    const d = String(ph || '').replace(/\D/g, '');
    if (!d) return '';
    return d.startsWith('0') ? '20' + d.slice(1) : d;
}

function fmtDate(ts) {
    if (!ts) return '-';
    return new Date(ts).toLocaleString(state.lang === 'ar' ? 'ar-EG' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' });
}

function openStudentDetail(id) {
    const s = db.students.find(x => x.id === id);
    if (!s) return;
    renderStudentDetail(s);
    switchView('student-detail-view');
}

function renderStudentDetail(s) {
    const ar = state.lang === 'ar';
    const L = (a, e) => ar ? a : e;
    const body = document.getElementById('student-detail-body');
    if (!body) return;
    const p = getStudentProgress(s);
    const st = computeStudentStats(s, p);

    const statCard = (icon, color, label, value, sub) => `
        <div class="sd-card p-3 sm:p-4 text-center">
            <div class="w-9 h-9 mx-auto rounded-full ${color} flex items-center justify-center mb-2"><i class="fas ${icon}"></i></div>
            <p class="text-xs opacity-60 mb-0.5">${label}</p>
            <p class="text-xl sm:text-2xl font-black leading-tight">${value}</p>
            ${sub ? `<p class="text-[11px] opacity-50 mt-0.5">${sub}</p>` : ''}
        </div>`;

    const lastTxt = st.days === null ? L('لم يدخل بعد', 'Never active')
        : st.days === 0 ? L('النهاردة', 'Today')
        : L(`من ${st.days} يوم`, `${st.days}d ago`);

    // 14-day activity strip
    const dayMs = 864e5, today = new Date(); today.setHours(0, 0, 0, 0);
    const activeDays = new Set();
    [...p.watchLog.map(w => w.ts), ...Object.values(p.hw).map(h => h.ts)].forEach(ts => {
        const d = new Date(ts); d.setHours(0, 0, 0, 0); activeDays.add(d.getTime());
    });
    let strip = '';
    for (let i = 13; i >= 0; i--) {
        const t0 = today.getTime() - i * dayMs;
        strip += `<div class="sd-day ${activeDays.has(t0) ? 'on' : ''}" title="${new Date(t0).toLocaleDateString(ar ? 'ar-EG' : 'en-GB')}"></div>`;
    }
    const activeCount = [...activeDays].filter(t0 => t0 >= today.getTime() - 13 * dayMs).length;

    // Alert
    let alertHtml = '';
    if (st.status === 'late') {
        alertHtml = `
        <div class="rounded-xl border border-red-500/40 bg-red-500/10 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div class="flex-1">
                <p class="font-bold text-red-600 dark:text-red-400"><i class="fas fa-triangle-exclamation me-2"></i>${L('الطالب متأخر', 'Student is falling behind')}</p>
                <p class="text-sm opacity-80 mt-1">${st.days === null ? L('مدخلش أي محاضرة لحد دلوقتي', 'No activity recorded yet') : L(`مفيش نشاط بقاله ${st.days} يوم`, `No activity for ${st.days} days`)}${st.lecturesLeft || st.hwLeft ? L(` • باقي عليه ${st.lecturesLeft} محاضرة و${st.hwLeft} واجب`, ` • ${st.lecturesLeft} lectures & ${st.hwLeft} homework left`) : ''}</p>
            </div>
            <button onclick="messageStudent('${s.id}', true)" class="bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:opacity-90 whitespace-nowrap"><i class="fas fa-paper-plane me-2"></i>${L('ابعتله تنبيه', 'Send a reminder')}</button>
        </div>`;
    }

    // Contact buttons
    const wa = (ph, label, color) => ph ? `<a href="https://wa.me/${intlPhone(ph)}" target="_blank" rel="noopener" class="px-4 py-2.5 rounded-xl font-bold text-sm text-white ${color} flex items-center gap-2"><i class="fab fa-whatsapp"></i>${label}</a>` : '';
    const contact = `
        <div class="flex flex-wrap gap-2">
            <button onclick="messageStudent('${s.id}', false)" class="px-4 py-2.5 rounded-xl font-bold text-sm bg-customPrimary text-white flex items-center gap-2"><i class="fas fa-envelope"></i>${L('رسالة', 'Message')}</button>
            ${s.phone ? `<a href="tel:${escHtml(s.phone)}" class="px-4 py-2.5 rounded-xl font-bold text-sm bg-blue-600 text-white flex items-center gap-2"><i class="fas fa-phone"></i>${L('اتصال', 'Call')}</a>` : ''}
            ${wa(s.phone, L('واتساب الطالب', 'WhatsApp'), 'bg-green-600')}
            ${wa(s.parentPhone, L('واتساب ولي الأمر', 'WhatsApp parent'), 'bg-emerald-700')}
        </div>`;

    // Courses progress
    const coursesHtml = st.courses.length ? st.courses.map(c => {
        const tl = c.lessons?.length || 0;
        const w = Object.keys(p.finished).filter(k => splitLessonKey(k).courseId === c.id).length;
        const pct = tl ? Math.round(w / tl * 100) : 0;
        return `<div class="py-2.5 border-b border-slate-200/10 last:border-0">
            <div class="flex justify-between text-sm mb-1.5"><span class="font-bold truncate me-2">${escHtml(c.name)}</span><span class="opacity-60 shrink-0">${w}/${tl} • ${pct}%</span></div>
            <div class="stat-bar"><div class="stat-bar-fill bg-customPrimary" style="width:${pct}%"></div></div>
        </div>`;
    }).join('') : `<p class="text-sm opacity-50 py-3">${L('لم يشترك في كورسات بعد', 'No courses yet')}</p>`;

    // Watch log
    const watchHtml = p.watchLog.length ? p.watchLog.slice(0, 40).map(w => {
        const c = db.courses.find(x => x.id === w.courseId);
        return `<div class="py-2 border-b border-slate-200/10 text-sm">
            <p class="font-bold break-words">${escHtml(w.title || (c?.lessons?.[w.lesson]?.title) || L('درس', 'Lesson'))}</p>
            <p class="text-xs opacity-50">${escHtml(c?.name || '')} • ${fmtDate(w.ts)}</p></div>`;
    }).join('') : `<p class="text-sm opacity-50 py-3">${L('لا يوجد سجل مشاهدة', 'No watch history')}</p>`;

    // Homework / tests
    const hwEntries = Object.entries(p.hw).sort((a, b) => b[1].ts - a[1].ts);
    const hwHtml = hwEntries.length ? hwEntries.map(([k, v]) => {
        const { courseId, idx } = splitLessonKey(k);
        const c = db.courses.find(x => x.id === courseId);
        const pct = v.total ? Math.round(v.correct / v.total * 100) : 0;
        const col = pct >= 70 ? 'text-green-500' : pct >= 50 ? 'text-amber-500' : 'text-red-500';
        return `<div class="py-2 border-b border-slate-200/10 text-sm flex justify-between items-center gap-3">
            <div class="min-w-0"><p class="font-bold break-words">${escHtml(c?.lessons?.[idx]?.title || L('واجب', 'Homework'))}</p>
            <p class="text-xs opacity-50">${escHtml(c?.name || '')} • ${fmtDate(v.ts)}</p></div>
            <span class="font-black ${col} shrink-0">${v.correct}/${v.total}</span></div>`;
    }).join('') : `<p class="text-sm opacity-50 py-3">${L('لا توجد واجبات محلولة', 'No homework submitted')}</p>`;

    body.innerHTML = `
        <div class="sd-card p-4 sm:p-6 space-y-4">
            <div class="flex items-start gap-4">
                <div class="w-16 h-16 rounded-full bg-customPrimary/15 text-customPrimary flex items-center justify-center text-2xl font-black shrink-0">${escHtml((s.name || '?')[0])}</div>
                <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 flex-wrap">
                        <h2 class="text-xl sm:text-2xl font-black break-words">${escHtml(s.name)}</h2>${statusChip(st.status)}
                    </div>
                    <p class="text-sm opacity-60 break-all">${escHtml(s.email || '')}</p>
                    <p class="text-xs opacity-60 mt-1">${levelLabel(s.level)}${s.level === 'univ' && s.faculty ? ' • ' + getFacultyName(s.faculty) : ''} • ${L('سنة', 'Year')} ${s.year || '-'}${s.joined ? ' • ' + L('انضم ', 'Joined ') + s.joined : ''}</p>
                    <p class="text-xs mt-1 font-medium break-words">
                        ${s.phone ? `<i class="fas fa-phone text-customPrimary me-1"></i>${escHtml(s.phone)}` : ''}
                        ${s.parentPhone ? ` <span class="opacity-40">|</span> <i class="fas fa-user-shield text-amber-500 me-1"></i>${escHtml(s.parentPhone)}` : ''}
                    </p>
                </div>
            </div>
            ${contact}
        </div>

        ${alertHtml}

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            ${statCard('fa-play-circle', 'bg-blue-500/15 text-blue-500', L('محاضرات شاهدها', 'Lectures watched'), `${st.watched}<span class="text-sm opacity-50">/${st.totalLessons}</span>`)}
            ${statCard('fa-hourglass-half', 'bg-orange-500/15 text-orange-500', L('محاضرات عليه', 'Lectures left'), st.lecturesLeft)}
            ${statCard('fa-check-double', 'bg-green-500/15 text-green-500', L('واجبات محلولة', 'Homework done'), `${st.hwDone}<span class="text-sm opacity-50">/${st.hwTotal}</span>`)}
            ${statCard('fa-list-check', 'bg-red-500/15 text-red-500', L('واجبات عليه', 'Homework left'), st.hwLeft)}
            ${statCard('fa-percent', 'bg-purple-500/15 text-purple-500', L('متوسط الدرجات', 'Avg score'), st.avg === null ? '-' : st.avg + '%')}
            ${statCard('fa-clock', 'bg-amber-500/15 text-amber-500', L('آخر نشاط', 'Last active'), `<span class="text-base">${lastTxt}</span>`, p.lastActive ? fmtDate(p.lastActive) : '')}
            ${statCard('fa-book-open', 'bg-teal-500/15 text-teal-500', L('كورسات مشترك فيها', 'Courses'), st.courses.length)}
            ${statCard('fa-wallet', 'bg-emerald-500/15 text-emerald-500', L('الرصيد', 'Wallet'), `${Number(s.wallet) || 0}<span class="text-xs opacity-50"> EGP</span>`)}
        </div>

        <div class="sd-card p-4 sm:p-5">
            <div class="flex justify-between text-sm mb-2"><span class="font-bold">${L('التقدم العام', 'Overall progress')}</span><span class="font-black text-customPrimary">${st.progress}%</span></div>
            <div class="stat-bar"><div class="stat-bar-fill bg-customPrimary" style="width:${st.progress}%"></div></div>
        </div>

        <div class="sd-card p-4 sm:p-5">
            <div class="flex justify-between items-center mb-3">
                <h3 class="font-bold"><i class="fas fa-calendar-check text-green-500 me-2"></i>${L('سجل الحضور (آخر 14 يوم)', 'Attendance (last 14 days)')}</h3>
                <span class="text-xs font-bold opacity-70">${activeCount}/14</span>
            </div>
            <div class="grid gap-1.5" style="grid-template-columns:repeat(14,minmax(0,1fr))">${strip}</div>
            <p class="text-[11px] opacity-50 mt-2">${L('اليوم الأخضر = الطالب شاهد محاضرة أو حل واجب', 'Green day = watched a lecture or submitted homework')}</p>
        </div>

        <div class="sd-card p-4 sm:p-5">
            <h3 class="font-bold mb-2"><i class="fas fa-layer-group text-customPrimary me-2"></i>${L('التقدم في كل كورس', 'Progress per course')}</h3>
            ${coursesHtml}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div class="sd-card p-4 sm:p-5">
                <h3 class="font-bold mb-2"><i class="fas fa-eye text-customPrimary me-2"></i>${L('سجل المشاهدات', 'Watch history')}</h3>
                <div class="max-h-80 overflow-y-auto pe-1">${watchHtml}</div>
            </div>
            <div class="sd-card p-4 sm:p-5">
                <h3 class="font-bold mb-2"><i class="fas fa-tasks text-amber-500 me-2"></i>${L('الواجبات والاختبارات', 'Homework & tests')}</h3>
                <div class="max-h-80 overflow-y-auto pe-1">${hwHtml}</div>
            </div>
        </div>`;
}

function messageStudent(id, reminder) {
    const s = db.students.find(x => x.id === id);
    if (!s) return;
    const st = computeStudentStats(s, getStudentProgress(s));
    const first = (s.name || '').split(' ')[0];
    switchView('inst-messages-view');
    openDM(id);
    const input = document.getElementById('dm-input');
    if (input && reminder) {
        input.value = state.lang === 'ar'
            ? `أهلاً ${first} 👋 لاحظت إنك متأخر في المتابعة${st.lecturesLeft || st.hwLeft ? ` وباقي عليك ${st.lecturesLeft} محاضرة و${st.hwLeft} واجب` : ''}. لو في أي مشكلة قولّي وأنا معاك.`
            : `Hi ${first} 👋 I noticed you're falling behind${st.lecturesLeft || st.hwLeft ? ` — ${st.lecturesLeft} lectures and ${st.hwLeft} homework left` : ''}. Let me know if you need any help.`;
        input.focus();
    }
}

window.openStudentDetail = openStudentDetail;
window.messageStudent = messageStudent;


// ==========================================================
// VIDEO / FILE UPLOAD FROM DEVICE  +  REAL MEDIA PLAYER
// ==========================================================
let pendingUploads = 0;
const MAX_UPLOAD_MB = { firebase: 1024, local: 300 };

// ---- local fallback storage (IndexedDB) ----
const VideoStore = {
    _db: null,
    open() {
        return new Promise((res, rej) => {
            if (this._db) return res(this._db);
            const r = indexedDB.open('fikra_media', 1);
            r.onupgradeneeded = () => r.result.createObjectStore('files');
            r.onsuccess = () => { this._db = r.result; res(r.result); };
            r.onerror = () => rej(r.error);
        });
    },
    async put(id, blob) {
        const d = await this.open();
        return new Promise((res, rej) => {
            const tx = d.transaction('files', 'readwrite');
            tx.objectStore('files').put(blob, id);
            tx.oncomplete = () => res();
            tx.onerror = () => rej(tx.error);
            tx.onabort = () => rej(tx.error || new Error('Storage full'));
        });
    },
    async get(id) {
        const d = await this.open();
        return new Promise((res, rej) => {
            const rq = d.transaction('files').objectStore('files').get(id);
            rq.onsuccess = () => res(rq.result || null);
            rq.onerror = () => rej(rq.error);
        });
    },
    async del(id) {
        const d = await this.open();
        return new Promise((res) => {
            const tx = d.transaction('files', 'readwrite');
            tx.objectStore('files').delete(id);
            tx.oncomplete = () => res();
            tx.onerror = () => res();
        });
    }
};

function storageReady() {
    try { return !!(window.firebaseApp && typeof firebase.storage === 'function'); } catch (e) { return false; }
}

// ---- builder UI for one content slot ----
function builderSlotHtml(lIndex, lesson, slot, label, placeholder, accept) {
    const ar = state.lang === 'ar';
    const url = lesson[slot + 'Url'] || '';
    const name = lesson[slot + 'Name'] || '';
    const isFile = !!name;
    const sid = `up-${lIndex}-${slot}`;
    const body = isFile ? `
        <div class="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2 text-sm">
            <i class="fas ${/\.pdf$/i.test(name) ? 'fa-file-pdf text-red-500' : 'fa-film text-green-500'}"></i>
            <span class="truncate flex-1 font-bold" dir="ltr">${escHtml(name)}</span>
            <button type="button" onclick="builderRemoveUpload(${lIndex}, '${slot}')" class="text-red-500 hover:text-red-600 shrink-0" title="${ar ? 'حذف' : 'Remove'}"><i class="fas fa-times"></i></button>
        </div>` : `
        <input type="text" class="w-full bg-black/5 border border-slate-200/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-customPrimary"
            placeholder="${placeholder}" value="${escHtml(url)}"
            onchange="builderLessons[${lIndex}].${slot}Url = this.value.trim()">
        <div class="flex items-center gap-2 mt-2 flex-wrap">
            <span class="text-xs opacity-50">${ar ? 'أو' : 'or'}</span>
            <label class="cursor-pointer bg-customPrimary/10 text-customPrimary border border-customPrimary/30 hover:bg-customPrimary hover:text-white transition-colors rounded-lg px-3 py-2 text-sm font-bold flex items-center gap-2">
                <i class="fas fa-cloud-upload-alt"></i> ${ar ? 'رفع من الجهاز' : 'Upload from device'}
                <input type="file" accept="${accept}" class="hidden" onchange="builderUploadFile(${lIndex}, '${slot}', this)">
            </label>
        </div>`;
    return `
        <div>
            <label class="text-xs font-bold opacity-70 mb-1 block">${label}</label>
            ${body}
            <div id="${sid}" class="hidden mt-2">
                <div class="flex justify-between text-xs mb-1"><span class="truncate me-2" id="${sid}-name"></span><span id="${sid}-pct" class="font-bold">0%</span></div>
                <div class="stat-bar"><div id="${sid}-bar" class="stat-bar-fill bg-customPrimary" style="width:0%"></div></div>
            </div>
        </div>`;
}

async function builderUploadFile(lIndex, slot, input) {
    const ar = state.lang === 'ar';
    const file = input.files && input.files[0];
    input.value = '';
    if (!file) return;
    const lesson = builderLessons[lIndex];
    if (!lesson) return;

    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v|mkv|ogv)$/i.test(file.name);
    if (!(isVideo || (isPdf && slot === 'summary'))) {
        return showToast(ar ? 'نوع الملف غير مدعوم (فيديو أو PDF للملخص)' : 'Unsupported file type', true);
    }
    const useCloud = storageReady();
    const limit = useCloud ? MAX_UPLOAD_MB.firebase : MAX_UPLOAD_MB.local;
    if (file.size > limit * 1024 * 1024) {
        return showToast(ar ? `الحجم كبير. الحد الأقصى ${limit} ميجا` : `File too large (max ${limit} MB)`, true);
    }

    const sid = `up-${lIndex}-${slot}`;
    const box = document.getElementById(sid);
    const bar = document.getElementById(sid + '-bar');
    const pct = document.getElementById(sid + '-pct');
    const nm = document.getElementById(sid + '-name');
    if (box) { box.classList.remove('hidden'); if (nm) nm.textContent = file.name; }
    const setP = (v) => { if (bar) bar.style.width = v + '%'; if (pct) pct.textContent = v + '%'; };
    setP(0);
    pendingUploads++;

    const done = (urlValue) => {
        pendingUploads--;
        lesson[slot + 'Url'] = urlValue;
        lesson[slot + 'Name'] = file.name;
        renderBuilderLessons();
        showToast(ar ? 'تم رفع الملف بنجاح' : 'File uploaded');
    };
    const fail = (e) => {
        pendingUploads--;
        console.warn('upload failed', e);
        if (box) box.classList.add('hidden');
        showToast(useCloud
            ? (ar ? 'فشل الرفع. تأكد إن Firebase Storage متفعّل وإن القواعد تسمح بالرفع' : 'Upload failed. Check that Firebase Storage is enabled and rules allow it')
            : (ar ? 'فشل الحفظ. مساحة المتصفح ممكن تكون ممتلئة' : 'Save failed. Browser storage may be full'), true);
    };

    if (useCloud) {
        try {
            const safe = file.name.replace(/[^\w.\-]+/g, '_');
            const ref = firebase.storage().ref(`course-media/${Date.now()}_${safe}`);
            const task = ref.put(file, { contentType: file.type || (isPdf ? 'application/pdf' : 'video/mp4') });
            task.on('state_changed',
                (snap) => setP(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
                fail,
                async () => {
                    try { done(await task.snapshot.ref.getDownloadURL()); } catch (e) { fail(e); }
                });
        } catch (e) { fail(e); }
    } else {
        try {
            const id = 'm_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
            setP(40);
            await VideoStore.put(id, file);
            setP(100);
            done('idb:' + id);
        } catch (e) { fail(e); }
    }
}

function builderRemoveUpload(lIndex, slot) {
    const ar = state.lang === 'ar';
    const lesson = builderLessons[lIndex];
    if (!lesson || !confirm(ar ? 'حذف الملف المرفوع؟' : 'Remove uploaded file?')) return;
    const url = lesson[slot + 'Url'] || '';
    if (url.startsWith('idb:')) VideoStore.del(url.slice(4));
    else if (storageReady() && url.startsWith('http')) {
        try { firebase.storage().refFromURL(url).delete().catch(() => {}); } catch (e) {}
    }
    lesson[slot + 'Url'] = '';
    lesson[slot + 'Name'] = '';
    renderBuilderLessons();
}

// ---- player ----
let lectureObjectUrls = [];
let lectureMediaToken = 0;

function parseMedia(url, name) {
    const u = (url || '').trim();
    if (!u) return null;
    if (u.startsWith('idb:')) return { type: 'idb', id: u.slice(4), pdf: /\.pdf$/i.test(name || '') };
    let m = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i);
    if (m) return { type: 'youtube', id: m[1] };
    m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if (m) return { type: 'vimeo', id: m[1] };
    if (/\.pdf(\?|#|$)/i.test(u) || /\.pdf$/i.test(name || '')) return { type: 'pdf', url: u };
    return { type: 'file', url: u };
}

function emptyMediaHtml() {
    const ar = state.lang === 'ar';
    return `<div class="text-center p-8"><i class="fas fa-video-slash text-5xl opacity-40 mb-3"></i><p class="text-sm font-bold opacity-70">${ar ? 'المعلم لسه ماضافش محتوى هنا' : 'No content added yet'}</p></div>`;
}

async function mediaMarkup(url, name) {
    const ar = state.lang === 'ar';
    const m = parseMedia(url, name);
    if (!m) return emptyMediaHtml();

    const pdfBox = (href) => `
        <div class="text-center p-8">
            <i class="fas fa-file-pdf text-6xl text-red-400 mb-4"></i>
            <p class="font-bold mb-4 break-words" dir="ltr">${escHtml(name || 'PDF')}</p>
            <div class="flex gap-3 justify-center flex-wrap">
                <a href="${href}" target="_blank" rel="noopener" class="bg-customPrimary text-white px-5 py-2.5 rounded-xl font-bold"><i class="fas fa-up-right-from-square me-2"></i>${ar ? 'فتح' : 'Open'}</a>
                <a href="${href}" download="${escHtml(name || 'file.pdf')}" class="bg-white/10 text-white px-5 py-2.5 rounded-xl font-bold"><i class="fas fa-download me-2"></i>${ar ? 'تحميل' : 'Download'}</a>
            </div>
        </div>`;
    const video = (src) => `<video class="w-full max-h-[75vh] bg-black rounded-none" src="${src}" controls playsinline preload="metadata" controlsList="nodownload" oncontextmenu="return false"></video>`;
    const frame = (src) => `<div class="w-full aspect-video"><iframe class="w-full h-full" src="${src}" title="video" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" loading="lazy"></iframe></div>`;

    if (m.type === 'youtube') return frame(`https://www.youtube-nocookie.com/embed/${m.id}?rel=0&modestbranding=1`);
    if (m.type === 'vimeo') return frame(`https://player.vimeo.com/video/${m.id}`);
    if (m.type === 'pdf') return pdfBox(escHtml(m.url));
    if (m.type === 'file') return video(escHtml(m.url));
    if (m.type === 'idb') {
        try {
            const blob = await VideoStore.get(m.id);
            if (!blob) return `<div class="text-center p-8"><i class="fas fa-triangle-exclamation text-4xl text-amber-400 mb-3"></i><p class="text-sm font-bold opacity-80">${ar ? 'الملف ده محفوظ على جهاز تاني. ارفعه تاني بعد تفعيل Firebase Storage.' : 'This file is stored on another device.'}</p></div>`;
            const obj = URL.createObjectURL(blob);
            lectureObjectUrls.push(obj);
            return (m.pdf || blob.type === 'application/pdf') ? pdfBox(obj) : video(obj);
        } catch (e) { return emptyMediaHtml(); }
    }
    return emptyMediaHtml();
}

// Render only the active tab (the others are cleared so audio/video stops).
async function loadLectureMedia(tab) {
    const token = ++lectureMediaToken;
    ['content-video', 'content-summary', 'solution-video'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });
    lectureObjectUrls.forEach(u => URL.revokeObjectURL(u));
    lectureObjectUrls = [];

    const c = db.courses.find(x => x.id === state.currentCourseId);
    const lec = c?.lessons?.[state.currentLectureIndex];
    if (!lec) return;

    let target = null;
    if (tab === 'video') target = ['content-video', lec.explainUrl, lec.explainName];
    else if (tab === 'summary') target = ['content-summary', lec.summaryUrl, lec.summaryName];
    else if (tab === 'solution') {
        const key = `${state.currentCourseId}_${state.currentLectureIndex}`;
        if (state.user.solutionUnlocked[key] || state.user.role === 'teacher') target = ['solution-video', lec.solutionUrl, lec.solutionName];
    }
    if (!target) return;

    const html = await mediaMarkup(target[1], target[2]);
    if (token !== lectureMediaToken) return;           // user already moved on
    const el = document.getElementById(target[0]);
    if (el) el.innerHTML = `<div class="w-full">${html}</div>`;
}

window.builderUploadFile = builderUploadFile;
window.builderRemoveUpload = builderRemoveUpload;
window.loadLectureMedia = loadLectureMedia;
