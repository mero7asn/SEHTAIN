import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import B2BRequest from '../models/B2BRequest.js';
import CharityRequest from '../models/CharityRequest.js';
import Review from '../models/Review.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await B2BRequest.deleteMany();
    await CharityRequest.deleteMany();
    await Review.deleteMany();

    console.log('Clearing existing database data...');

    // 1. Create Users
    const adminUser = await User.create({
      _id: '600000000000000000000001',
      name: 'مدير النظام',
      email: 'admin@test.com',
      phone: '0500000000',
      password: 'Admin1234',
      role: 'admin'
    });

    const customerUser1 = await User.create({
      _id: '600000000000000000000002',
      name: 'أحمد محمود',
      email: 'customer@test.com',
      phone: '0501234567',
      password: 'Test1234',
      role: 'customer',
      addresses: [{
        city: 'الرياض',
        district: 'النخيل',
        street: 'طريق الملك فهد',
        building: '12',
        apartment: '4',
        isDefault: true
      }]
    });

    const customerUser2 = await User.create({
      _id: '600000000000000000000003',
      name: 'سارة خالد',
      email: 'sara@test.com',
      phone: '0559876543',
      password: 'Test1234',
      role: 'customer',
      addresses: [{
        city: 'جدة',
        district: 'الشاطئ',
        street: 'طريق الكورنيش',
        building: '5',
        apartment: '12',
        isDefault: true
      }]
    });

    const customerUser3 = await User.create({
      _id: '600000000000000000000004',
      name: 'محمد الدوسري',
      email: 'mohammed@test.com',
      phone: '0561112233',
      password: 'Test1234',
      role: 'customer'
    });

    const customerUser4 = await User.create({
      _id: '600000000000000000000005',
      name: 'فاطمة الزهراني',
      email: 'fatima@test.com',
      phone: '0544445566',
      password: 'Test1234',
      role: 'customer'
    });

    const customerUser5 = await User.create({
      _id: '600000000000000000000006',
      name: 'خالد السبيعي',
      email: 'khaled@test.com',
      phone: '0598887766',
      password: 'Test1234',
      role: 'customer'
    });

    console.log('Demo Users Created: 6');

    // 2. Create Products
    const productsData = [
      {
        _id: '600000000000000000000010',
        name: 'مياه صحتين 330 مل',
        slug: 'sahtain-water-330ml',
        description: 'عبوات مياه نقية حجم 330 مل، مثالية للاستخدام اليومي في المنزل، الأنشطة، والضيافة الخفيفة. مصممة بعناية لتناسب حقيبتك وسيارتك.',
        price: 25.00,
        discountPrice: 22.00,
        sku: 'SH-330-24',
        category: 'individuals',
        volume: '330 مل',
        packageQuantity: 24,
        weight: '7.9 كجم',
        stock: 150,
        images: ['https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80'],
        active: true
      },
      {
        _id: '600000000000000000000011',
        name: 'مياه صحتين 500 مل',
        slug: 'sahtain-water-500ml',
        description: 'عبوة مياه صحية حجم 500 مل، الحجم الأكثر شعبية للرياضة والعمل والرحلات. نقاء طبيعي بجودة عالية.',
        price: 35.00,
        discountPrice: 30.00,
        sku: 'SH-500-24',
        category: 'individuals',
        volume: '500 مل',
        packageQuantity: 24,
        weight: '12 كجم',
        stock: 200,
        images: ['https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80'],
        active: true
      },
      {
        _id: '600000000000000000000012',
        name: 'مياه صحتين 600 مل',
        slug: 'sahtain-water-600ml',
        description: 'عبوة مياه صحتين سعة 600 مل بحجم مريح ومثالي للترطيب المستمر طوال اليوم.',
        price: 30.00,
        discountPrice: 27.00,
        sku: 'SH-600-24',
        category: 'individuals',
        volume: '600 مل',
        packageQuantity: 24,
        weight: '14.4 كجم',
        stock: 120,
        images: ['https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=800&q=80'],
        active: true
      },
      {
        _id: '600000000000000000000013',
        name: 'مياه صحتين 1.5 لتر',
        slug: 'sahtain-water-1-5l',
        description: 'عبوات مياه حجم 1.5 لتر العائلية، مناسبة للمنازل، والمكاتب، وطاولات الطعام والاجتماعات.',
        price: 18.00,
        discountPrice: 16.00,
        sku: 'SH-150-06',
        category: 'business',
        volume: '1.5 لتر',
        packageQuantity: 6,
        weight: '9 كجم',
        stock: 90,
        images: ['https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80'],
        active: true
      },
      {
        _id: '600000000000000000000014',
        name: 'مياه صحتين 5 لتر',
        slug: 'sahtain-water-5l',
        description: 'جالون مياه صحتين 5 لتر كبير، خيار اقتصادي ومثالي للمطابخ والمساجد والبر والمخيمات.',
        price: 20.00,
        discountPrice: 18.00,
        sku: 'SH-500-04',
        category: 'charity',
        volume: '5 لتر',
        packageQuantity: 4,
        weight: '20 كجم',
        stock: 80,
        images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80'],
        active: true
      },
      {
        _id: '600000000000000000000015',
        name: 'مياه صحتين 330 مل (كرتون العائلة 40 عبوة)',
        slug: 'sahtain-water-330ml-40pack',
        description: 'كرتون التوفير العائلي سعة 330 مل يحتوي على 40 عبوة مياه صحية ناعمة ونقية.',
        price: 38.00,
        discountPrice: 34.00,
        sku: 'SH-330-40',
        category: 'individuals',
        volume: '330 مل',
        packageQuantity: 40,
        weight: '13.2 كجم',
        stock: 180,
        images: ['https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80'],
        active: true
      },
      {
        _id: '600000000000000000000016',
        name: 'مياه صحتين الزمزمية 200 مل',
        slug: 'sahtain-water-200ml',
        description: 'عبوة صغار مريحة للطلاب والمناسبة للضيافة والاجتماعات السريعة.',
        price: 22.00,
        discountPrice: 19.00,
        sku: 'SH-200-48',
        category: 'business',
        volume: '200 مل',
        packageQuantity: 48,
        weight: '9.6 كجم',
        stock: 140,
        images: ['https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80'],
        active: true
      },
      {
        _id: '600000000000000000000017',
        name: 'مياه صحتين الزجاجية الفاخرة 250 مل',
        slug: 'sahtain-glass-250ml',
        description: 'عبوات زجاجية أنيقة فاخرة مخصصة للفنادق، والمطاعم الراقية، ولقاءات كبار الشخصيات.',
        price: 65.00,
        discountPrice: 58.00,
        sku: 'SH-GLS-24',
        category: 'business',
        volume: '250 مل',
        packageQuantity: 24,
        weight: '11 كجم',
        stock: 65,
        images: ['https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=800&q=80'],
        active: true
      },
      {
        _id: '600000000000000000000018',
        name: 'كرتون سقيا الخير للمساجد (330 مل × 40)',
        slug: 'sahtain-charity-mosque-330ml',
        description: 'كرتون خاص للتبرع للمساجد يحتوي على 40 عبوة ناعمة سريعة الفتح والتوزيع.',
        price: 32.00,
        discountPrice: 28.00,
        sku: 'SH-CHR-40',
        category: 'charity',
        volume: '330 مل',
        packageQuantity: 40,
        weight: '13.2 كجم',
        stock: 300,
        images: ['https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80'],
        active: true
      },
      {
        _id: '600000000000000000000019',
        name: 'جالون صحتين 12 لتر للمقتنيات والمنازل',
        slug: 'sahtain-water-12l',
        description: 'عبوة كبيرة سعة 12 لتر مناسبة للمبردات العائلية والمكاتب مع مقبض مريح.',
        price: 15.00,
        discountPrice: 13.50,
        sku: 'SH-12L-01',
        category: 'individuals',
        volume: '12 لتر',
        packageQuantity: 1,
        weight: '12 كجم',
        stock: 110,
        images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80'],
        active: true
      }
    ];

    const createdProducts = await Product.insertMany(productsData);
    console.log(`Demo Products Created: ${createdProducts.length}`);

    // 3. Create Orders (15 Orders)
    const ordersData = [
      {
        orderNumber: 'SH-100240',
        user: customerUser1._id,
        customerInfo: { fullName: customerUser1.name, phone: customerUser1.phone, email: customerUser1.email },
        items: [{
          product: createdProducts[0]._id,
          name: createdProducts[0].name,
          price: 22,
          quantity: 3,
          volume: createdProducts[0].volume,
          packageQuantity: 24,
          image: createdProducts[0].images[0]
        }],
        subtotal: 66,
        vat: 9.9,
        deliveryFee: 10,
        total: 85.9,
        shippingAddress: customerUser1.addresses[0],
        paymentMethod: 'cod',
        paymentStatus: 'paid',
        orderStatus: 'تم التوصيل'
      },
      {
        orderNumber: 'SH-100241',
        user: customerUser1._id,
        customerInfo: { fullName: customerUser1.name, phone: customerUser1.phone, email: customerUser1.email },
        items: [{
          product: createdProducts[0]._id,
          name: createdProducts[0].name,
          price: 22,
          quantity: 2,
          volume: createdProducts[0].volume,
          packageQuantity: 24,
          image: createdProducts[0].images[0]
        }],
        subtotal: 44,
        vat: 6.6,
        deliveryFee: 10,
        total: 60.6,
        shippingAddress: customerUser1.addresses[0],
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        orderStatus: 'خرج للتوصيل'
      },
      {
        orderNumber: 'SH-100242',
        user: customerUser1._id,
        customerInfo: { fullName: customerUser1.name, phone: customerUser1.phone, email: customerUser1.email },
        items: [{
          product: createdProducts[1]._id,
          name: createdProducts[1].name,
          price: 30,
          quantity: 3,
          volume: createdProducts[1].volume,
          packageQuantity: 24,
          image: createdProducts[1].images[0]
        }],
        subtotal: 90,
        vat: 13.5,
        deliveryFee: 10,
        total: 113.5,
        shippingAddress: customerUser1.addresses[0],
        paymentMethod: 'card',
        paymentStatus: 'paid',
        orderStatus: 'تم التوصيل'
      },
      {
        orderNumber: 'SH-100243',
        user: customerUser2._id,
        customerInfo: { fullName: customerUser2.name, phone: customerUser2.phone, email: customerUser2.email },
        items: [{
          product: createdProducts[3]._id,
          name: createdProducts[3].name,
          price: 18,
          quantity: 5,
          volume: createdProducts[3].volume,
          packageQuantity: 6,
          image: createdProducts[3].images[0]
        }],
        subtotal: 90,
        vat: 13.5,
        deliveryFee: 10,
        total: 113.5,
        shippingAddress: customerUser2.addresses[0],
        paymentMethod: 'applepay',
        paymentStatus: 'paid',
        orderStatus: 'قيد التجهيز'
      },
      {
        orderNumber: 'SH-100244',
        user: customerUser1._id,
        customerInfo: { fullName: customerUser1.name, phone: customerUser1.phone, email: customerUser1.email },
        items: [{
          product: createdProducts[4]._id,
          name: createdProducts[4].name,
          price: 20,
          quantity: 2,
          volume: createdProducts[4].volume,
          packageQuantity: 4,
          image: createdProducts[4].images[0]
        }],
        subtotal: 40,
        vat: 6,
        deliveryFee: 10,
        total: 56.0,
        shippingAddress: customerUser1.addresses[0],
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        orderStatus: 'جديد'
      },
      {
        orderNumber: 'SH-100245',
        user: customerUser2._id,
        customerInfo: { fullName: customerUser2.name, phone: customerUser2.phone, email: customerUser2.email },
        items: [{
          product: createdProducts[2]._id,
          name: createdProducts[2].name,
          price: 30,
          quantity: 4,
          volume: createdProducts[2].volume,
          packageQuantity: 24,
          image: createdProducts[2].images[0]
        }],
        subtotal: 120,
        vat: 18,
        deliveryFee: 10,
        total: 148.0,
        shippingAddress: { city: 'الدمام', district: 'الزهور', street: 'شارع الأول' },
        paymentMethod: 'card',
        paymentStatus: 'paid',
        orderStatus: 'قيد المعالجة'
      },
      {
        orderNumber: 'SH-100246',
        user: customerUser3._id,
        customerInfo: { fullName: customerUser3.name, phone: customerUser3.phone, email: customerUser3.email },
        items: [{
          product: createdProducts[5]._id,
          name: createdProducts[5].name,
          price: 34,
          quantity: 10,
          volume: createdProducts[5].volume,
          packageQuantity: 40,
          image: createdProducts[5].images[0]
        }],
        subtotal: 340,
        vat: 51,
        deliveryFee: 10,
        total: 401.0,
        shippingAddress: { city: 'الرياض', district: 'الياسمين', street: 'طريق أنس بن مالك' },
        paymentMethod: 'card',
        paymentStatus: 'paid',
        orderStatus: 'تم التوصيل'
      },
      {
        orderNumber: 'SH-100247',
        user: customerUser4._id,
        customerInfo: { fullName: customerUser4.name, phone: customerUser4.phone, email: customerUser4.email },
        items: [{
          product: createdProducts[7]._id,
          name: createdProducts[7].name,
          price: 58,
          quantity: 5,
          volume: createdProducts[7].volume,
          packageQuantity: 24,
          image: createdProducts[7].images[0]
        }],
        subtotal: 290,
        vat: 43.5,
        deliveryFee: 10,
        total: 343.5,
        shippingAddress: { city: 'جدة', district: 'الروضة', street: 'شارع الكيالي' },
        paymentMethod: 'applepay',
        paymentStatus: 'paid',
        orderStatus: 'خرج للتوصيل'
      },
      {
        orderNumber: 'SH-100248',
        user: customerUser5._id,
        customerInfo: { fullName: customerUser5.name, phone: customerUser5.phone, email: customerUser5.email },
        items: [{
          product: createdProducts[8]._id,
          name: createdProducts[8].name,
          price: 28,
          quantity: 20,
          volume: createdProducts[8].volume,
          packageQuantity: 40,
          image: createdProducts[8].images[0]
        }],
        subtotal: 560,
        vat: 84,
        deliveryFee: 0,
        total: 644.0,
        shippingAddress: { city: 'مكة المكرمة', district: 'العزيزية', street: 'شارع المسجد الحرام' },
        paymentMethod: 'card',
        paymentStatus: 'paid',
        orderStatus: 'تم التوصيل'
      },
      {
        orderNumber: 'SH-100249',
        user: customerUser3._id,
        customerInfo: { fullName: customerUser3.name, phone: customerUser3.phone, email: customerUser3.email },
        items: [{
          product: createdProducts[1]._id,
          name: createdProducts[1].name,
          price: 30,
          quantity: 6,
          volume: createdProducts[1].volume,
          packageQuantity: 24,
          image: createdProducts[1].images[0]
        }],
        subtotal: 180,
        vat: 27,
        deliveryFee: 10,
        total: 217.0,
        shippingAddress: { city: 'الرياض', district: 'الملقا', street: 'طريق حطين' },
        paymentMethod: 'applepay',
        paymentStatus: 'paid',
        orderStatus: 'قيد التجهيز'
      },
      {
        orderNumber: 'SH-100250',
        user: customerUser4._id,
        customerInfo: { fullName: customerUser4.name, phone: customerUser4.phone, email: customerUser4.email },
        items: [{
          product: createdProducts[6]._id,
          name: createdProducts[6].name,
          price: 19,
          quantity: 15,
          volume: createdProducts[6].volume,
          packageQuantity: 48,
          image: createdProducts[6].images[0]
        }],
        subtotal: 285,
        vat: 42.75,
        deliveryFee: 10,
        total: 337.75,
        shippingAddress: { city: 'الخبر', district: 'الحزام الذهبي', street: 'شارع الأمير فيصل' },
        paymentMethod: 'card',
        paymentStatus: 'paid',
        orderStatus: 'تم التوصيل'
      },
      {
        orderNumber: 'SH-100251',
        user: customerUser5._id,
        customerInfo: { fullName: customerUser5.name, phone: customerUser5.phone, email: customerUser5.email },
        items: [{
          product: createdProducts[9]._id,
          name: createdProducts[9].name,
          price: 13.5,
          quantity: 8,
          volume: createdProducts[9].volume,
          packageQuantity: 1,
          image: createdProducts[9].images[0]
        }],
        subtotal: 108,
        vat: 16.2,
        deliveryFee: 10,
        total: 134.2,
        shippingAddress: { city: 'المدينة المنورة', district: 'سلطانة', street: 'طريق السلام' },
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        orderStatus: 'جديد'
      },
      {
        orderNumber: 'SH-100252',
        user: customerUser1._id,
        customerInfo: { fullName: customerUser1.name, phone: customerUser1.phone, email: customerUser1.email },
        items: [{
          product: createdProducts[0]._id,
          name: createdProducts[0].name,
          price: 22,
          quantity: 10,
          volume: createdProducts[0].volume,
          packageQuantity: 24,
          image: createdProducts[0].images[0]
        }],
        subtotal: 220,
        vat: 33,
        deliveryFee: 10,
        total: 263.0,
        shippingAddress: customerUser1.addresses[0],
        paymentMethod: 'applepay',
        paymentStatus: 'paid',
        orderStatus: 'خرج للتوصيل'
      },
      {
        orderNumber: 'SH-100253',
        user: customerUser2._id,
        customerInfo: { fullName: customerUser2.name, phone: customerUser2.phone, email: customerUser2.email },
        items: [{
          product: createdProducts[3]._id,
          name: createdProducts[3].name,
          price: 16,
          quantity: 12,
          volume: createdProducts[3].volume,
          packageQuantity: 6,
          image: createdProducts[3].images[0]
        }],
        subtotal: 192,
        vat: 28.8,
        deliveryFee: 10,
        total: 230.8,
        shippingAddress: customerUser2.addresses[0],
        paymentMethod: 'card',
        paymentStatus: 'paid',
        orderStatus: 'تم التوصيل'
      },
      {
        orderNumber: 'SH-100254',
        user: customerUser3._id,
        customerInfo: { fullName: customerUser3.name, phone: customerUser3.phone, email: customerUser3.email },
        items: [{
          product: createdProducts[8]._id,
          name: createdProducts[8].name,
          price: 28,
          quantity: 15,
          volume: createdProducts[8].volume,
          packageQuantity: 40,
          image: createdProducts[8].images[0]
        }],
        subtotal: 420,
        vat: 63,
        deliveryFee: 0,
        total: 483.0,
        shippingAddress: { city: 'الرياض', district: 'النفل', street: 'طريق أبو بكر الصديق' },
        paymentMethod: 'card',
        paymentStatus: 'paid',
        orderStatus: 'جديد'
      }
    ];

    await Order.insertMany(ordersData);
    console.log(`Demo Orders Created: ${ordersData.length}`);

    // 4. Create B2B Requests (6 Requests)
    await B2BRequest.insertMany([
      {
        companyName: 'فندق النخيل جولد',
        contactName: 'عبدالرحمن العتيبي',
        phone: '0501112233',
        email: 'info@nakheelgold.demo',
        businessType: 'فنادق وضيافة',
        city: 'الرياض',
        quantity: '500 كرتون 330 مل شهرياً',
        deliveryDate: new Date('2026-09-01'),
        notes: 'يرجى تقديم عرض سعر شامل التوصيل الأسبوعي للفندق',
        status: 'قيد التواصل'
      },
      {
        companyName: 'شركة الأفق للاستشارات',
        contactName: 'منى السالم',
        phone: '0543334455',
        email: 'admin@horizons.demo',
        businessType: 'شركات ومكاتب',
        city: 'جدة',
        quantity: '100 كرتون 500 مل',
        deliveryDate: new Date('2026-08-20'),
        notes: 'مطلوب توريد لمقر الشركة الرئيسي',
        status: 'جديد'
      },
      {
        companyName: 'مستشفى الشفاء التخصصي',
        contactName: 'د. فيصل الشهري',
        phone: '0556667788',
        email: 'supply@alshifa.demo',
        businessType: 'مستشفيات ومراكز صحية',
        city: 'الرياض',
        quantity: '1200 كرتون 330 مل شهرياً',
        deliveryDate: new Date('2026-08-25'),
        notes: 'مطلوب شهادات التحليل المخبري وجودة المياه مع عرض السعر',
        status: 'تم الاتفاق'
      },
      {
        companyName: 'مطاعم السلسلة الذهبية',
        contactName: 'وليد الغامدي',
        phone: '0569990011',
        email: 'procurement@goldenchain.demo',
        businessType: 'مطاعم ومقاهي',
        city: 'الدمام',
        quantity: '800 كرتون 200 مل شهرياً',
        deliveryDate: new Date('2026-09-05'),
        notes: 'توريد لـ 6 فروع بالمنطقة الشرقية',
        status: 'قيد التواصل'
      },
      {
        companyName: 'مجمع مدارس الرواد الأهلية',
        contactName: 'أ. سعود المطيري',
        phone: '0504443322',
        email: 'info@alrowad-schools.demo',
        businessType: 'مدارس ومعاهد',
        city: 'الرياض',
        quantity: '600 كرتون 330 مل شهرياً',
        deliveryDate: new Date('2026-09-10'),
        notes: 'توزيع يومي للفصول والطلاب',
        status: 'جديد'
      },
      {
        companyName: 'منتجع الساحل الأنيق',
        contactName: 'عادل المالكي',
        phone: '0537778899',
        email: 'resort@sahel.demo',
        businessType: 'فنادق ومنتجعات',
        city: 'الخبر',
        quantity: '300 كرتون عبوات زجاجية 250 مل',
        deliveryDate: new Date('2026-08-30'),
        notes: 'تعبئة وتوصيل لغرف الأجنحة الملكية',
        status: 'تم الاتفاق'
      }
    ]);
    console.log('Demo B2B Requests Created: 6');

    // 5. Create Charity Requests (6 Requests)
    await CharityRequest.insertMany([
      {
        organizationName: 'مسجد الوالدين - حي النفل',
        organizationType: 'جامع ومسجد',
        location: 'الرياض - حي النفل',
        beneficiaries: 800,
        quantity: '200 كرتون 330 مل',
        phone: '0567778899',
        notes: 'توزيع للمصلين في صلاة الجمعة',
        status: 'تم التوفير'
      },
      {
        organizationName: 'جمعية إطعام الخيرية',
        organizationType: 'جمعية خيرية',
        location: 'الدمام',
        beneficiaries: 1500,
        quantity: '400 كرتون 500 مل',
        phone: '0512223344',
        notes: 'توزيع على الأسر المتعففة',
        status: 'جديد'
      },
      {
        organizationName: 'جامع الإيمان - حي الروضة',
        organizationType: 'جامع ومسجد',
        location: 'جدة - حي الروضة',
        beneficiaries: 1200,
        quantity: '300 كرتون 330 مل',
        phone: '0508889900',
        notes: 'توزيع في الحلقات القرآنية وصلاة الفجر والجمعة',
        status: 'قيد المعالجة'
      },
      {
        organizationName: 'مؤسسة البر الخيرية بالمدينة',
        organizationType: 'جمعية خيرية',
        location: 'المدينة المنورة',
        beneficiaries: 2500,
        quantity: '600 كرتون 330 مل',
        phone: '0541112233',
        notes: 'توزيع لزوار المسجد النبوي الشريف وقاصدي الخير',
        status: 'تم التوفير'
      },
      {
        organizationName: 'جامع التوحيد - حي العزيزية',
        organizationType: 'جامع ومسجد',
        location: 'مكة المكرمة - العزيزية',
        beneficiaries: 3000,
        quantity: '800 كرتون 330 مل',
        phone: '0553332211',
        notes: 'توزيع لحجاج ومعتمري بيت الله الحرام',
        status: 'جديد'
      },
      {
        organizationName: 'جمعية كفالة الأيتام',
        organizationType: 'جمعية خيرية',
        location: 'الرياض - حي الملز',
        beneficiaries: 600,
        quantity: '150 كرتون 500 مل',
        phone: '0562224455',
        notes: 'سقيا مخصصة لفعاليات دور الأيتام الأسبوعية',
        status: 'تم التوفير'
      }
    ]);
    console.log('Demo Charity Requests Created: 6');

    // 6. Create Reviews (8 Reviews)
    await Review.insertMany([
      {
        user: customerUser1._id,
        name: 'أحمد محمود',
        orderNumber: 'SH-100242',
        rating: 5,
        comment: 'التوصيل سريع جداً والمياه ذات طعم نقي ورائع. شكراً صحتين!',
        approved: true
      },
      {
        user: customerUser2._id,
        name: 'سارة خالد',
        orderNumber: 'SH-100243',
        rating: 5,
        comment: 'خدمة عملاء ممتازة وعبوات أنيقة جودة عالية.',
        approved: true
      },
      {
        user: customerUser3._id,
        name: 'محمد الدوسري',
        orderNumber: 'SH-100246',
        rating: 4,
        comment: 'تجربة طلب سهلة وسريعة والتغليف ممتاز.',
        approved: true
      },
      {
        user: customerUser4._id,
        name: 'فاطمة الزهراني',
        orderNumber: 'SH-100247',
        rating: 5,
        comment: 'وصل الطلب في الوقت المحدد تماماً، والتغليف حراري ممتاز يمنع وصول التلوث.',
        approved: true
      },
      {
        user: customerUser5._id,
        name: 'خالد السبيعي',
        orderNumber: 'SH-100248',
        rating: 5,
        comment: 'أفضل شركة تبرع وسقيا مساجد، تم التوفير لجامع العزيزية بمكة وموافاتي بالصور.',
        approved: true
      },
      {
        name: 'عبدالله البقمي',
        orderNumber: 'SH-100250',
        rating: 5,
        comment: 'التعامل راقي والمياه عذبة ونقية جداً. أنصح بالتعامل معهم دائماً.',
        approved: true
      },
      {
        name: 'نورة التميمي',
        orderNumber: 'SH-100253',
        rating: 5,
        comment: 'تطبيقات وموقع نقي وسهل جداً، الدفع بسلاسة والتوصيل حتى باب الشقة.',
        approved: true
      },
      {
        name: 'فهد العتيبي',
        orderNumber: 'SH-100254',
        rating: 4,
        comment: 'سعر كرتون العائلة ممتاز ومناسب جداً مقارنة بالسوق.',
        approved: true
      }
    ]);
    console.log('Demo Reviews Created: 8');

    console.log('ALL RICH SEED DATA IMPORTED SUCCESSFULLY!');
    process.exit();
  } catch (error) {
    console.error(`Error importing seed data: ${error.message}`);
    process.exit(1);
  }
};

importData();
