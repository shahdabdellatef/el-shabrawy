import { useMemo, useState, useEffect } from "react";
import "./styles.css";
import logo from "./assets/logo.png";

// =====================================================
// الفروع
// =====================================================

const branches = [
  "6 أكتوبر — 1004 الممشى السياحي، محور جمال عبد الناصر، داخل الجامعة الكندية",
  "مدينة نصر — 12 عمارات راموسيتي ستار، داخل نادي الزهور",
  "التجمع — داخل نادي الزهور",
  "المعادي — رينج مول، بجوار نادي الصيد",
  "مدينتي — كرافت زون، محل G25",
  "شيراتون — داخل الأكاديمية البحرية",
  "السعودية — أبها",
  "مودرن أكاديمي — زهراء المعادي",
];

// =====================================================
// Helpers
// =====================================================

const sandwich = (
  id,
  name,
  balady,
  shamy,
  subCategory
) => ({
  id,
  name,
  balady,
  shamy,
  mainCategory: "sandwiches",
  subCategory,
});

const product = (
  id,
  name,
  price,
  mainCategory,
  subCategory,
  description = ""
) => ({
  id,
  name,
  price,
  mainCategory,
  subCategory,
  description,
});

// =====================================================
// MENU DATA
// =====================================================

const menuData = [
  // =====================================================
  // سندوتشات الفول
  // =====================================================

  ...[
    ["ساندوتش فول الشبراوي", 13, 12],
    ["ساندوتش فول صلصة", 15, 14],
    ["ساندوتش فول زيت زيتون", 15, 14],
    ["ساندوتش فول زيت حار", 15, 14],
    ["ساندوتش فول زبدة", 15, 14],
    ["ساندوتش فول سمنة", 15, 14],
    ["ساندوتش فول بالحمص", 15, 14],
    ["ساندوتش فول إسكندراني", 15, 14],
    ["ساندوتش فول بيض مسلوق", 21, 20],
    ["ساندوتش فول بيض مقلي", 23, 22],
    ["ساندوتش فول بسطرمة", 21, 20],
    ["ساندوتش فول شكشوكة", 20, 19],
    ["ساندوتش فول لحم مفروم", 23, 22],
    ["ساندوتش فول سوسيس", 19, 18],
    ["ساندوتش فول باذنجان", 16, 15],
    ["ساندوتش فول بابا غنوج", 16, 15],
    ["ساندوتش فول دوبل", 16, 15],
    ["ساندوتش فول بيض بسطرمة", 25, 24],
    ["ساندوتش فول سلطة", 14, 13],
    ["ساندوتش فول سجق", 21, 20],
    ["ساندوتش فول روول", "-", 22],
    ["ساندوتش فول معصفر", 16, 15],
    ["ساندوتش فول مخصوص", 16, 15],
  ].map((item, i) =>
    sandwich(
      `foul-${i}`,
      item[0],
      item[1],
      item[2],
      "foul"
    )
  ),

  // =====================================================
  // سندوتشات الطعمية
  // =====================================================

  ...[
    ["ساندوتش طعمية الشبراوي", 14, 12],
    ["ساندوتش طعمية محشية", 16, 15],
    ["ساندوتش طعمية عجة بلدي", 23, 22],
    ["ساندوتش طعمية ميكس", 17, 16],
    ["ساندوتش طعمية بيض مسلوق", 23, 22],
    ["ساندوتش طعمية بيض مقلي", 25, 24],
    ["ساندوتش طعمية بطاطس", 21, 20],
    ["ساندوتش طعمية باذنجان", 17, 16],
    ["ساندوتش طعمية دوبل", 16, 15],
    ["ساندوتش طعمية حمص", 15, 14],
    ["ساندوتش طعمية عين كتكوت", 23, 22],
    ["ساندوتش طعمية بسطرمة", 23, 22],
    ["ساندوتش طعمية بابا غنوج", 16, 15],
    ["ساندوتش طعمية طحينة فقط", 14, 13],
    ["ساندوتش طعمية سادة", 14, 13],
    ["ساندوتش طعمية محشية بالباذنجان", 18, 17],
    ["ساندوتش طعمية سلطة خضرا فقط", 14, 13],
    ["ساندوتش طعمية 500", 15, 14],
    ["ساندوتش طعمية طماطم وخيار", 15, 14],
    ["ساندوتش طعمية جبنة مثلثات", 20, 19],
    ["ساندوتش طعمية جبنة شيدر", 27, 26],
    ["ساندوتش طعمية ليمون معصفر", 16, 15],
    ["ساندوتش طعمية مخصوص", 16, 15],
    ["ساندوتش طعمية تحابيش", 16, 15],
    ["ساندوتش طعمية جبنة كيري", 27, 27],
    ["ساندوتش طعمية كيري وبسطرمة", 36, 35],
    ["ماك طعمية", "-", 31],
  ].map((item, i) =>
    sandwich(
      `falafel-${i}`,
      item[0],
      item[1],
      item[2],
      "falafel"
    )
  ),

  // =====================================================
  // سندوتشات البيض والجبنة
  // =====================================================

  ...[
    ["ساندوتش بيض مقلي", 20, 19],
    ["ساندوتش بيض مسلوق", 18, 17],
    ["ساندوتش بيض جبنة بيضة", 21, 20],
    ["ساندوتش أومليت رومي", 24, 23],
    ["ساندوتش أومليت خضار سبانش", 21, 20],
    ["ساندوتش بيض مسلوق عمدة", 21, 20],
    ["ساندوتش شكشوكة", 22, 21],
    ["ساندوتش أومليت بسطرمة", 26, 25],
    ["ساندوتش أومليت لحمة", 26, 25],
    ["ساندوتش أومليت بيتزا", 31, 30],
    ["ساندوتش أومليت اباتشي", 31, 30],
    ["ساندوتش أومليت سوسيس", 25, 24],
    ["ساندوتش أومليت شيدر", 30, 29],
    ["ساندوتش أومليت فول صلصة", 24, 23],
    ["ساندوتش أومليت بطاطس سوسيس", 29, 28],
    ["ساندوتش أومليت مشروم وشيدر", 31, 30],
    ["ساندوتش أومليت موتزاريلا", 24, 23],
    ["ساندوتش أومليت سجق", 25, 24],
    ["ساندوتش أومليت ميكس جبن", 28, 27],
  ].map((item, i) =>
    sandwich(
      `eggs-${i}`,
      item[0],
      item[1],
      item[2],
      "eggs"
    )
  ),

  // =====================================================
  // الجبنة المقلية
  // =====================================================

  ...[
    ["ساندوتش جبنة مقلية شامي", 25, 24],
    ["ساندوتش جبنة مقلية كاتشب", 26, 25],
    ["ساندوتش جبنة مقلية مايونيز", 26, 25],
    ["ساندوتش جبنة مقلية ك،م", 27, 26],
    ["ساندوتش جبنة مقلية بطاطس ك،م", 29, 28],
    ["ساندوتش جبنة مقلية كولوسلو", 27, 26],
    ["ساندوتش جبنة مقلية روول", "-", 40],
  ].map((item, i) =>
    sandwich(
      `fried-cheese-${i}`,
      item[0],
      item[1],
      item[2],
      "fried-cheese"
    )
  ),

  // =====================================================
  // البطاطس
  // =====================================================

  ...[
    ["ساندوتش بطاطس شيبسي", 16, 15],
    ["ساندوتش بورية زيت", 19, 18],
    ["ساندوتش بورية زبدة", 19, 18],
    ["ساندوتش بطاطس محمرة", 21, 20],
    ["ساندوتش بطاطس جبنة رومي", 28, 27],
    ["ساندوتش بطاطس بيض مسلوق", 29, 28],
    ["ساندوتش بطاطس بيض مقلي", 31, 30],
    ["ساندوتش بطاطس كاتشب", 23, 22],
    ["ساندوتش بطاطس مايونيز", 23, 22],
    ["ساندوتش بطاطس تحابيش", 24, 23],
    ["ساندوتش بطاطس باذنجان", 24, 23],
    ["ساندوتش بطاطس ك، م", 25, 24],
    ["ساندوتش بطاطس جبنة وكاتشب", 28, 27],
    ["ساندوتش بطاطس جبنة ومايونيز", 28, 27],
    ["ساندوتش بطاطس جبنة شيدر", 31, 30],
    ["ساندوتش بطاطس فلانتينو", 26, 25],
    ["ساندوتش بطاطس كولوسلو", 24, 23],
    ["ساندوتش بطاطس بابا غنوج", 25, 24],
    ["ساندوتش بورية بيض مقلي", 29, 28],
    ["ساندوتش بورية بيض مسلوق", 28, 27],
    ["ساندوتش بورية جبنة رومي", 26, 25],
    ["ساندوتش بطاطس سوسيس", 28, 27],
    ["ساندوتش بطاطس بسطرمة", 29, 28],
    ["ساندوتش بطاطس جبنة مقلية", 35, 34],
    ["ساندوتش شيبسي جبنة رومي", 26, 25],
    ["ساندوتش شيبسي مايونيز", 23, 22],
    ["ساندوتش شيبسي كاتشب", 23, 22],
    ["ساندوتش بطاطس سجق", 29, 28],
    ["ساندوتش بازوكا صوابع", 35, 34],
    ["ساندوتش بطاطس ثومية", 24, 23],
    ["ساندوتش بطاطس موتزاريلا", 26, 25],
    ["ساندوتش بطاطس سادة", 21, 20],
    ["ساندوتش بطاطس طحينة فقط", 21, 20],
    ["ساندوتش بطاطس ميكس جبن", 31, 30],
    ["ساندوتش بطاطس جمبري", 21, 20],
  ].map((item, i) =>
    sandwich(
      `potato-${i}`,
      item[0],
      item[1],
      item[2],
      "potatoes"
    )
  ),

  // =====================================================
  // سندوتشات اللحوم
  // =====================================================

  product(
    "hawawshi",
    "حواوشي",
    65,
    "sandwiches",
    "meat-sandwiches",
    "بلدي"
  ),

  product(
    "sausage-meat",
    "سوسيس",
    65,
    "sandwiches",
    "meat-sandwiches",
    "سوري 65 / فينو 60"
  ),

  product(
    "mexican",
    "مكسيكان",
    75,
    "sandwiches",
    "meat-sandwiches",
    "سوري 75 / فينو 65"
  ),

  product(
    "liver",
    "س كبدة إسكندراني",
    65,
    "sandwiches",
    "meat-sandwiches",
    "سوري 65 / فينو 60"
  ),

  product(
    "kofta-sandwich",
    "س كفتة",
    70,
    "sandwiches",
    "meat-sandwiches",
    "سوري 70 / فينو 65"
  ),

  product(
    "sogok-sandwich",
    "س سجق",
    65,
    "sandwiches",
    "meat-sandwiches",
    "سوري 65 / فينو 60"
  ),

  product(
    "monster-burger",
    "برجر مونستر أوف ذارود",
    150,
    "sandwiches",
    "meat-sandwiches",
    "سنجل 150 / دبل 210"
  ),

  product(
    "rogers-burger",
    "برجر روجرز",
    150,
    "sandwiches",
    "meat-sandwiches",
    "سنجل 150 / دبل 210"
  ),

  product(
    "track-burger",
    "برجر تراك",
    130,
    "sandwiches",
    "meat-sandwiches",
    "سنجل 130 / دبل 180"
  ),

  product(
    "fried-chicken",
    "فراخ فرايد شيكن",
    130,
    "sandwiches",
    "meat-sandwiches",
    "سنجل 130 / دبل 170"
  ),
  // =====================================================
  // سندوتشات المنوعه 
  // =====================================================
  
  ...[
    ["ساندوتش منوعه مسقعه الشبراوي", 16, 15],
    ["ساندوتش باذنجان مقلي", 16, 15],
    ["ساندوتش جبنة بالطماطم", 16, 15],
    ["ساندوتش باباغنوج", 16, 15],
    ["ساندوتش فلفل مقلي", 15, 14],
    ["ساندوتش ديناميت", 27, 26],
    ["ساندوتش مسقعه باللحمه", 32, 22],
  ].map((item, i) =>
    sandwich(
      `variety-${i}`,
      item[0],
      item[1],
      item[2],
      "variety"
    )
  ),
  // =====================================================
  // إضافات شرقي
  // =====================================================

  ...[
    ["بسطرمة", 10],
    ["بطاطس", 8],
    ["كولوسلو", 5],
    ["زيتون شرائح", 2],
    ["جبنة رومي", 8],
    ["جبنة شيدر", 8],
    ["جبنة موتزاريلا", 10],
    ["زيت حار", 2],
    ["زيت زيتون", 2],
    ["فلفل مقلي", 2],
    ["سوسيس", 10],
    ["باذنجان مقلي", 4],
    ["جبنة كيري", 8],
    ["مشروم", 7],
    ["سجق", 10],
    ["كاتشب", 3],
    ["مايونيز", 3],
    ["عيش سوري", 10],
    ["عيش فرنساوي", 10],
    ["لحم مفروم", 15],
    ["بيضة مسلوقة", 8],
    ["باكت بطاطس", 35],
    ["باكت شيبسي", 25],
    ["باكت بازوكا", 55],
  ].map((item, i) =>
    product(
      `addition-${i}`,
      item[0],
      item[1],
      "sandwiches",
      "eastern-additions"
    )
  ),

  // =====================================================
  // الأطباق
  // =====================================================

  ...[
    ["أومليت سادة", 31],
    ["أومليت شيدر", 40],
    ["أومليت بسطرمة", 40],
    ["أومليت بيتزا", 43],
    ["أومليت اباتشي", 43],
    ["أومليت جبنة رومي", 35],
    ["أومليت سوسيس", 40],
    ["أومليت خضار سبانش", 33],
    ["بيض مسلوق عمدة", 19],
    ["بازوكا صوابع", 53],
    ["بصارة", 20],
    ["جبنة مقلية", 40],
    ["توست", 6],
    ["تحابيش", 40],
    ["باذنجان مقلي وسط", 13],
    ["باذنجان مقلي كبير", 15],
  ].map((item, i) =>
    product(
      `dish-${i}`,
      item[0],
      item[1],
      "dishes",
      "dishes"
    )
  ),

  // =====================================================
  // الوجبات
  // =====================================================

  ...[
    ["وجبة شيش طاووق", 150],
    ["وجبة فراخ بانيه أو كرسبي", 190],
    ["وجبة كفتة", 120],
    ["وجبة فاهيتا فراخ", 130],
    ["وجبة تشيكن جريل", 145],
    ["وجبة سوبر زنجر", 190],
    ["طبق أرز بسمتي", 30],
  ].map((item, i) =>
    product(
      `meal-${i}`,
      item[0],
      item[1],
      "meals",
      "meals"
    )
  ),

  // =====================================================
  // أقراص الطعمية
  // =====================================================

  ...[
    ["قرص طعمية إماطي", 3],
    ["قرص طعمية كبير", 5],
    ["قرص طعمية محشية", 6],
    ["قرص طعمية وسط 3S", 4],
    ["قرص طعمية عين كتكوت", 13],
    ["قرص عجة بلدي (1 بيضة)", 16],
    ["قرص طعمية كيري", 15],
    ["قرص طعمية موتزاريلا", 14],
    ["قرص طعمية بسطرمة وكيري", 22],
    ["قرص طعمية بسطرمة", 14],
    ["قرص طعمية جبنة مثلثات", 10],
    ["قرص طعمية ليمون معصفر", 6],
  ].map((item, i) =>
    product(
      `falafel-disk-${i}`,
      item[0],
      item[1],
      "falafel-disks",
      "falafel-disks"
    )
  ),

  // =====================================================
  // العلب
  // =====================================================

  ...[
    ["فول ساده", 23],
    ["فول محوج", 28],
    ["فول حمص", 30],
    ["فول زيت زيتون", 30],
    ["فول زيت حار", 30],
    ["فول سمنة بلدي", 30],
    ["فول زبدة", 30],
    ["فول صلصة", 23],
    ["فول إسكندراني", 30],
    ["فول بيض مقلي", 35],
    ["فول بيض مسلوق", 33],
    ["عدس سادة", 38],
    ["عدس زبدة", 43],
    ["عدس سمنة", 43],
    ["عجينة طعمية", 23],
    ["مسقعة", 28],
    ["مسقعة باللحم المفروم", 40],
    ["بورية زيت", 23],
    ["بورية سمنة", 28],
    ["بورية زبدة", 28],
    ["شكشوكة", 38],
    ["بورية بيض مقلي", 40],
    ["بورية بيض مسلوق", 33],
    ["فول بسطرمة", 33],
    ["فول سوسيس", 30],
    ["فول باللحمة", 33],
    ["بورية باللحمة", 41],
    ["بورية جبنة رومي", 36],
    ["فول سجق", 38],
    ["فول ليمون معصفر", 30],
  ].map((item, i) =>
    product(
      `box-${i}`,
      item[0],
      item[1],
      "boxes",
      "boxes"
    )
  ),

  // =====================================================
  // الكريب
  // =====================================================

  ...[
    ["تشيكن بانيه", 120],
    ["تشيكن كريسبي", 120, "حار أو عادي"],
    ["تشيكن رانش", 110],
    ["شيش طاووق", 110],
    ["سوسيس", 95],
    ["سجق", 85],
    ["كبدة", 85],
    ["برجر", 105],
    ["بسطرمة", 85],
    ["وحش فراخ", 120],
    ["وحش لحوم", 115],
    ["ماهيتا فراخ", 115],
    ["شاورما فراخ", 110],
    ["بطاطس", 70],
    ["ميكس جبن", 95],
    ["نوتيلا", 75],
    ["نوتيلا ومكسرات", 85],
    ["لوتس", 75],
    ["إضافة موتزاريلا للكريب", 10],
    ["إضافة بطاطس للكريب", 10],
  ].map((item, i) =>
    product(
      `crepe-${i}`,
      item[0],
      item[1],
      "crepe",
      "crepe",
      item[2] || ""
    )
  ),

  // =====================================================
  // س رول سوري
  // =====================================================

  ...[
    ["طعمية روول أو فيينا", 25],
    ["بطاطس روول أو فيينا", 35],
    ["بطاطس بالطعمية روول أو فيينا", 35],
    ["بطاطس ك + م روول أو فيينا", 45],
    ["طعمية جبنة كيري روول أو فيينا", 40],
    ["بطاطس جبنة رومي روول أو فيينا", 45],
    ["بطاطس جبنة موتزاريلا روول أو فيينا", 40],
    ["بطاطس جبنة شيدر روول أو فيينا", 45],
    ["بطاطس ميكس جبن روول أو فيينا", 55],
    ["فلانتينو روول أو فيينا", 45],
    ["بازوكا روول أو فيينا", 45],
    ["جبنة مقلية روول أو فيينا", 45],
    ["بطاطس كم موتزريلا", 55],
    ["جبنة رومي فرن روول أو فيينا", 55],
  ].map((item, i) =>
    product(
      `syrian-${i}`,
      item[0],
      item[1],
      "syrian",
      "syrian-roll"
    )
  ),

  // =====================================================
  // المشروبات
  // =====================================================

  product(
    "drink-can",
    "كانز — كوكاكولا / فانتا / سبرايت",
    20,
    "drinks",
    "drinks"
  ),

  product(
    "drink-tea",
    "شاي",
    12,
    "drinks",
    "drinks"
  ),

  product(
    "drink-spiro",
    "سبيرو سباتس",
    20,
    "drinks",
    "drinks"
  ),

  product(
    "drink-water",
    "مياة صغيرة",
    7,
    "drinks",
    "drinks"
  ),

  product(
    "drink-coffee",
    "قهوة",
    20,
    "drinks",
    "drinks"
  ),

  // =====================================================
  // السلطات
  // =====================================================

  product(
    "salad-pickles",
    "طرشي",
    8,
    "sandwiches",
    "salads",
    "صغير 8 / وسط 10 / كبير 12"
  ),

  product(
    "salad-eggplant",
    "باذنجان مخلل",
    10,
    "sandwiches",
    "salads",
    "صغير 10 / وسط 12 / كبير 14"
  ),

  product(
    "salad-baba",
    "بابا غنوج",
    12,
    "sandwiches",
    "salads",
    "صغير 12 / وسط 17 / كبير 22"
  ),

  product(
    "salad-tomato",
    "طماطم مقبله",
    8,
    "sandwiches",
    "salads",
    "صغير 8 / وسط 10 / كبير 12"
  ),

  product(
    "salad-pepper",
    "فلفل مقلي",
    10,
    "sandwiches",
    "salads",
    "صغير 10 / وسط 12 / كبير 14"
  ),

  product(
    "salad-balady",
    "سلطة بلدي",
    8,
    "sandwiches",
    "salads",
    "صغير 8 / وسط 10 / كبير 12"
  ),

  product(
    "salad-cheese",
    "جبنة بالطماطم",
    12,
    "sandwiches",
    "salads",
    "صغير 12 / وسط 17 / كبير 22"
  ),

  product(
    "salad-tahini",
    "سلطة طحينة",
    14,
    "sandwiches",
    "salads",
    "صغير 14 / وسط 19 / كبير 24"
  ),

  product(
    "salad-garlic",
    "ثومية",
    17,
    "sandwiches",
    "salads",
    "حجم واحد"
  ),
];

// =====================================================
// MAIN CATEGORIES
// =====================================================

const mainCategories = [
  { id: "all", name: "الكل" },
  { id: "sandwiches", name: "سندوتشات" },
  { id: "dishes", name: "أطباق" },
  { id: "meals", name: "وجبات" },
  { id: "falafel-disks", name: "أقراص الطعمية" },
  { id: "crepe", name: "كريب" },
  { id: "boxes", name: "علب" },
  { id: "syrian", name: "س رول سوري" },
  { id: "drinks", name: "مشروبات" },
];

// =====================================================
// SUB CATEGORIES
// =====================================================

const subCategories = {
  sandwiches: [
    { id: "all", name: "الكل" },
    { id: "foul", name: "فول" },
    { id: "falafel", name: "طعمية" },
    { id: "eggs", name: "بيض" },
    { id: "fried-cheese", name: "جبنة مقلية" },
    { id: "potatoes", name: "بطاطس" },
    { id: "meat-sandwiches", name: "اللحوم" },
    { id: "variety", name: "سندوتشات متنوعة" },
    { id: "eastern-additions", name: "إضافات شرقي" },
    { id: "salads", name: "السلطات" },
  ],

  dishes: [
    { id: "all", name: "الكل" },
    { id: "dishes", name: "الأطباق" },
    { id: "salads", name: "السلطات" },
  ],

  meals: [
    { id: "all", name: "الكل" },
    { id: "meals", name: "الوجبات" },
    { id: "salads", name: "السلطات" },
  ],

  "falafel-disks": [
    { id: "all", name: "الكل" },
    { id: "falafel-disks", name: "أقراص الطعمية" },
    { id: "salads", name: "السلطات" },
  ],

  crepe: [
    { id: "all", name: "الكل" },
    { id: "crepe", name: "الكريب" },
    { id: "salads", name: "السلطات" },
  ],

  boxes: [
    { id: "all", name: "الكل" },
    { id: "boxes", name: "العلب" },
    { id: "salads", name: "السلطات" },
  ],

  syrian: [
    { id: "all", name: "الكل" },
    { id: "syrian-roll", name: "س رول سوري" },
    { id: "salads", name: "السلطات" },
  ],

  drinks: [
    { id: "all", name: "الكل" },
    { id: "drinks", name: "المشروبات" },
    { id: "salads", name: "السلطات" },
  ],
};

// =====================================================
// HOME
// =====================================================

function Home({ onMenu }) {
  return (
    <main className="home" dir="rtl">
      <div className="orange-glow glow-1"></div>
      <div className="orange-glow glow-2"></div>

      <section className="home-content">
        <div className="logo-wrapper">
          <img
            src={logo}
            alt="الشبراوي - ملوك الفول والطعمية"
            className="main-logo"
          />
        </div>

        <button className="menu-btn" onClick={onMenu}>
          <span>المنيو</span>
          <span className="arrow">←</span>
        </button>

        <div className="hotline-box">
          <span className="hotline-title">
            HOT LINE
          </span>

          <a
            href="tel:16842"
            className="hotline-number"
          >
            16842
          </a>
        </div>
      </section>

      <section className="branches-section">
        <div className="section-heading">
          <span></span>
          <h2>فروعنا</h2>
          <span></span>
        </div>

        <p className="branches-subtitle">
          تلاقينا في أقرب فرع ليك
        </p>

        <div className="branches-grid">
          {branches.map((branch, index) => (
            <div
              className="branch-card"
              key={index}
            >
              <span className="branch-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p>{branch}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <span>الشبراوي</span>
        <b>•</b>
        <span>ملوك الفول والطعمية</span>
      </footer>
    </main>
  );
}

// =====================================================
// THEME TOGGLE
// =====================================================

function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button
      className={`advanced-theme-toggle ${
        darkMode ? "dark" : "light"
      }`}
      onClick={onToggle}
      aria-label="تغيير الوضع"
      title={
        darkMode
          ? "التبديل للوضع الفاتح"
          : "التبديل للوضع الداكن"
      }
    >
      <span className="theme-track">
        <span className="theme-icon moon">
          ☾
        </span>

        <span className="theme-icon sun">
          ☀
        </span>

        <span className="theme-thumb">
          {darkMode ? "☾" : "☀"}
        </span>
      </span>
    </button>
  );
}

// =====================================================
// MENU
// =====================================================

function Menu({ onBack }) {
  const [activeMain, setActiveMain] =
    useState("all");

  const [activeSub, setActiveSub] =
    useState("all");

  const [search, setSearch] = useState("");

  const [darkMode, setDarkMode] =
    useState(true);

  // ===================================================
  // THEME
  // ===================================================

  useEffect(() => {
    document.body.classList.toggle(
      "light-mode",
      !darkMode
    );

    return () => {
      document.body.classList.remove(
        "light-mode"
      );
    };
  }, [darkMode]);

  // ===================================================
  // FILTER
  // ===================================================

  const filteredProducts = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return menuData.filter((item) => {
      // -----------------------------------------------
      // لو اختارنا السلطات:
      // تظهر السلطات مهما كان الـ Main Category
      // -----------------------------------------------

      if (activeSub === "salads") {
        const matchesSearch =
          !searchValue ||
          item.name
            .toLowerCase()
            .includes(searchValue) ||
          item.description
            ?.toLowerCase()
            .includes(searchValue);

        return (
          item.subCategory === "salads" &&
          matchesSearch
        );
      }

      // -----------------------------------------------
      // Main Category
      // -----------------------------------------------

      const matchesMain =
        activeMain === "all" ||
        item.mainCategory === activeMain;

      // -----------------------------------------------
      // Sub Category
      // -----------------------------------------------

      const matchesSub =
        activeSub === "all" ||
        item.subCategory === activeSub;

      // -----------------------------------------------
      // Search
      // -----------------------------------------------

      const matchesSearch =
        !searchValue ||
        item.name
          .toLowerCase()
          .includes(searchValue) ||
        item.description
          ?.toLowerCase()
          .includes(searchValue);

      return (
        matchesMain &&
        matchesSub &&
        matchesSearch
      );
    });
  }, [
    activeMain,
    activeSub,
    search,
  ]);

  // ===================================================
  // CATEGORY HANDLERS
  // ===================================================

  const handleMainCategory = (category) => {
    setActiveMain(category);
    setActiveSub("all");
  };

  const handleSubCategory = (category) => {
    setActiveSub(category);
  };

  // ===================================================
  // RETURN
  // ===================================================

  return (
    <main
      className="menu-page"
      dir="rtl"
    >
      {/* HEADER */}

      <header className="menu-header">
        <button
          className="back-btn"
          onClick={onBack}
          aria-label="العودة"
        >
          ←
        </button>

        <div className="menu-logo-mark">
          الشبراوي
        </div>

        <h1>المنيو</h1>

        <p>ملوك الفول والطعمية</p>
      </header>

      {/* SEARCH + THEME */}

      <div className="menu-tools">
        <div className="search-box">
          <span className="search-icon">
            ⌕
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="ابحث عن اسم المنتج..."
            dir="rtl"
          />

          {search && (
            <button
              className="clear-search"
              onClick={() =>
                setSearch("")
              }
              aria-label="مسح البحث"
            >
              ×
            </button>
          )}
        </div>

        <ThemeToggle
          darkMode={darkMode}
          onToggle={() =>
            setDarkMode((prev) => !prev)
          }
        />
      </div>

      {/* MAIN CATEGORIES */}

      <nav className="main-categories sticky-categories">
        {mainCategories.map((category) => (
          <button
            key={category.id}
            className={
              activeMain === category.id
                ? "category-btn active"
                : "category-btn"
            }
            onClick={() =>
              handleMainCategory(
                category.id
              )
            }
          >
            {category.name}
          </button>
        ))}
      </nav>

      {/* SUB CATEGORIES */}

      {activeMain !== "all" &&
        subCategories[activeMain] && (
          <nav className="sub-categories sticky-subcategories">
            {subCategories[
              activeMain
            ].map((category) => (
              <button
                key={category.id}
                className={
                  activeSub === category.id
                    ? "sub-category-btn active"
                    : "sub-category-btn"
                }
                onClick={() =>
                  handleSubCategory(
                    category.id
                  )
                }
              >
                {category.name}
              </button>
            ))}
          </nav>
        )}

      {/* PRODUCTS */}

      <section className="products-container">
        {filteredProducts.map((item) => (
          <article
            className="menu-item"
            key={item.id}
          >
            <div className="item-info">
              <h2>{item.name}</h2>

              {item.description && (
                <p>{item.description}</p>
              )}
            </div>

            {/* بلدي / شامي */}

            {item.balady !== undefined ||
            item.shamy !== undefined ? (
              <div className="sandwich-prices">
                <div className="price-column">
                  <span>بلدي</span>

                  <strong>
                    {item.balady === "-"
                      ? "—"
                      : item.balady}
                  </strong>
                </div>

                <div className="price-divider"></div>

                <div className="price-column">
                  <span>شامي</span>

                  <strong>
                    {item.shamy === "-"
                      ? "—"
                      : item.shamy}
                  </strong>
                </div>
              </div>
            ) : (
              <div className="single-price">
                <strong>
                  {item.price}
                </strong>

                <span>جنيه</span>
              </div>
            )}
          </article>
        ))}

        {filteredProducts.length === 0 && (
          <div className="empty-menu">
            مفيش أصناف مطابقة للبحث
          </div>
        )}
      </section>

      {/* HOTLINE */}

      <a
        href="tel:16842"
        className="hotline-mini"
      >
        <span>HOT LINE</span>
        <strong>16842</strong>
      </a>
    </main>
  );
}

// =====================================================
// APP
// =====================================================

export default function App() {
  const [page, setPage] =
    useState("home");

  return (
    <>
      {page === "home" && (
        <Home
          onMenu={() =>
            setPage("menu")
          }
        />
      )}

      {page === "menu" && (
        <Menu
          onBack={() =>
            setPage("home")
          }
        />
      )}
    </>
  );
}