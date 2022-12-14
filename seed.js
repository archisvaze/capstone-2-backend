let seed = [
    {
        username: 'Lacey Smith',
        email: 'fermentum.arcu.vestibulum@yahoo.org',
        city: 'Đồng Hới',
        rating: 4,
        country: 'Austria',
        speciality: 'Psychiatrist',
        experience: 'massa. Vestibulum accumsan neque et nunc.',
        qualification: 'MBBS',
        onboarded: true,
        password: '1CADA31F-6DBE-7ED6-C685-9B4451D8E50B',
        hospital: 'Amet Institute',
        days: [
            'Monday',
            'Saturday',
            'Thursday',
            'Friday',
            'Wednesday',
            'Sunday'
        ],
        cost: 46,
        times: ['10:00-10:30', '14:00-14:30'],
        img: 'https://randomuser.me/api/portraits/med/men/47.jpg'
    },
    {
        username: 'Joshua Morales',
        email: 'in.faucibus@hotmail.net',
        city: 'Cork',
        country: 'United States',
        speciality: 'Otolaryngologist',
        rating: 5,
        experience: 'Morbi accumsan laoreet ipsum. Curabitur consequat, lectus sit amet',
        qualification: 'BS',
        onboarded: true,
        password: '635828CD-4A2A-0D89-B28C-519910EB9DC3',
        hospital: 'Dui Fusce LLP',
        days: ['Saturday', 'Tuesday', 'Friday', 'Thursday', 'Wednesday'],
        cost: 59,
        times: ['9:00-9:30', '14:00-14:30', '10:30-11:00'],
        img: 'https://randomuser.me/api/portraits/med/men/3.jpg'
    },
    {
        username: "Brent O'connor",
        email: 'pharetra.felis@outlook.org',
        city: 'Bogotá',
        country: 'Ireland',
        rating: 3,
        speciality: 'Ophthalmologist',
        experience: 'aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet non,',
        qualification: 'PHD',
        onboarded: true,
        password: '8F75FADE-F957-77B0-8267-C989B3938C19',
        hospital: 'Malesuada Id Consulting',
        days: ['Friday', 'Sunday', 'Saturday', 'Wednesday', 'Monday'],
        cost: 145,
        times: ['13:30-14:00', '13:00-13:30', '10:30-11:00', '12:00-12:30'],
        img: 'https://randomuser.me/api/portraits/med/men/61.jpg'
    },
    {
        username: 'Kyle Walker',
        email: 'amet@google.com',
        city: 'Blieskastel',
        country: 'United Kingdom',
        speciality: 'Anesthesiologist',
        experience: 'nascetur',
        rating: 5,
        qualification: 'MDS',
        onboarded: true,
        password: '5D59ABCA-A2AB-76D6-40D4-0ADC9B958810',
        hospital: 'Dignissim Maecenas Ornare Limited',
        days: ['Wednesday', 'Tuesday', 'Sunday', 'Monday'],
        cost: 170,
        times: ['9:30-10:00', '11:00-11:30', '15:00-15:30', '12:30-13:00'],
        img: 'https://randomuser.me/api/portraits/med/women/36.jpg'
    },
    {
        username: 'Hayes Cote',
        email: 'hendrerit.id@icloud.edu',
        city: 'Cao Bằng',
        country: 'Mexico',
        speciality: 'Obstetrician/Gynecologist',
        experience: 'ut mi. Duis',
        qualification: 'MS',
        rating: 3,
        onboarded: true,
        password: '52C2EEA9-E0EF-0D94-6A31-4444D0BBD7C0',
        hospital: 'Aliquet Odio Etiam PC',
        days: ['Friday', 'Thursday', 'Saturday', 'Monday', 'Wednesday'],
        cost: 73,
        times: ['9:00-9:30', '10:30-11:00', '14:30-15:00'],
        img: 'https://randomuser.me/api/portraits/med/men/56.jpg'
    },
    {
        username: 'Roanna Johnson',
        email: 'aenean.massa@protonmail.couk',
        city: 'Canberra',
        country: 'China',
        speciality: 'Oncologist',
        experience: 'Proin',
        rating: 5,
        qualification: 'BDS',
        onboarded: true,
        password: '5DBD4A50-A151-6949-CBF8-EAC75D5AC119',
        hospital: 'Facilisis Facilisis Associates',
        days: ['Saturday', 'Sunday', 'Tuesday', 'Thursday', 'Friday'],
        cost: 169,
        times: ['11:30-12:00', '9:00-9:30', '16:00-16:30', '12:30-13:00'],
        img: 'https://randomuser.me/api/portraits/med/men/64.jpg'
    },
    {
        username: 'Bradley Franco',
        email: 'cras.sed.leo@google.com',
        city: 'Henan',
        country: 'Mexico',
        speciality: 'Otolaryngologist',
        experience: 'sem ut dolor dapibus gravida. Aliquam tincidunt,',
        qualification: 'BDS',
        rating: 4,
        onboarded: true,
        password: 'E5F97220-D131-F748-37C7-782DDDD81356',
        hospital: 'Tempus Non Lacinia Corp.',
        days: ['Monday', 'Friday', 'Saturday', 'Thursday', 'Sunday'],
        cost: 87,
        times: ['16:30-17:00', '12:00-12:30'],
        img: 'https://randomuser.me/api/portraits/med/men/55.jpg'
    },
    {
        username: 'Audrey Wyatt',
        email: 'non.massa.non@protonmail.org',
        city: 'Heredia',
        rating: 5,
        country: 'Netherlands',
        speciality: 'Neurologist',
        experience: 'nunc sit amet metus.',
        qualification: 'MBBS',
        onboarded: true,
        password: '86B11434-CA3A-462A-A8A1-E975297059B1',
        hospital: 'Sem Elit Incorporated',
        days: ['Wednesday', 'Thursday', 'Saturday'],
        cost: 194,
        times: ['9:30-10:00', '13:00-13:30', '14:00-14:30'],
        img: 'https://randomuser.me/api/portraits/med/men/26.jpg'
    },
    {
        username: 'Amena Rios',
        email: 'eleifend.non.dapibus@outlook.net',
        city: 'Springfield',
        country: 'Spain',
        speciality: 'Cardiologist',
        experience: 'elit elit fermentum risus, at',
        qualification: 'MD',
        rating: 3,
        onboarded: true,
        password: 'A1EEFE2D-8974-F2B1-6BF8-A5271F6ACAD0',
        hospital: 'Ac Turpis Egestas Industries',
        days: ['Friday', 'Sunday', 'Wednesday'],
        cost: 175,
        times: ['10:00-10:30', '15:30-16:00', '10:30-11:00'],
        img: 'https://randomuser.me/api/portraits/med/women/15.jpg'
    },
    {
        username: 'Conan Tanner',
        email: 'lorem.luctus.ut@protonmail.org',
        city: 'Motueka',
        country: 'South Africa',
        speciality: 'Otolaryngologist',
        experience: 'egestas blandit. Nam nulla magna, malesuada vel,',
        rating: 2,
        qualification: 'MD',
        onboarded: true,
        password: 'E38DEE1A-7973-79A3-5B8A-D4BF563BB5EC',
        hospital: 'Luctus Lobortis Class Industries',
        days: ['Sunday', 'Monday', 'Wednesday', 'Saturday', 'Friday'],
        cost: 99,
        times: ['14:00-14:30', '16:00-16:30', '11:30-12:00'],
        img: 'https://randomuser.me/api/portraits/med/men/53.jpg'
    },
    {
        username: 'Pandora Bond',
        email: 'dis.parturient@aol.ca',
        city: 'Hoogeveen',
        country: 'United States',
        speciality: 'Neurologist',
        experience: 'Fusce mollis. Duis sit amet diam',
        qualification: 'MS',
        rating: 5,
        onboarded: true,
        password: 'C5312A2C-47BC-56EA-89E7-623594B9F229',
        hospital: 'Donec Egestas Inc.',
        days: ['Thursday', 'Monday', 'Tuesday', 'Saturday', 'Wednesday'],
        cost: 55,
        times: ['9:30-10:00', '16:30-17:00', '13:30-14:00', '16:00-16:30'],
        img: 'https://randomuser.me/api/portraits/med/men/75.jpg'
    },
    {
        username: 'Kenneth Baker',
        email: 'duis@hotmail.org',
        city: 'Villa del Rosario',
        country: 'South Korea',
        speciality: 'Nephrologist',
        rating: 5,
        experience: 'id ante dictum cursus. Nunc mauris',
        qualification: 'MD',
        onboarded: true,
        password: '6475C828-6C24-ECBD-71D4-CFB8EF9D3574',
        hospital: 'Aenean Sed Institute',
        days: ['Friday', 'Tuesday', 'Sunday', 'Saturday'],
        cost: 98,
        times: [
            '13:30-14:00',
            '15:00-15:30',
            '11:30-12:00',
            '9:30-10:00',
            '14:00-14:30'
        ],
        img: 'https://randomuser.me/api/portraits/med/women/38.jpg'
    },
    {
        username: 'Aristotle Campos',
        email: 'tempus@yahoo.net',
        city: 'Serang',
        country: 'Belgium',
        speciality: 'Neurologist',
        rating: 5,
        experience: 'egestas blandit. Nam',
        qualification: 'MBBS',
        onboarded: true,
        password: 'B6228DE4-9965-874E-D884-028B29BBC86E',
        hospital: 'Vel Nisl Quisque Institute',
        days: ['Saturday', 'Wednesday', 'Thursday'],
        cost: 167,
        times: ['14:00-14:30', '16:30-17:00', '9:00-9:30'],
        img: 'https://randomuser.me/api/portraits/med/men/96.jpg'
    },
    {
        username: 'Devin King',
        email: 'semper.dui@icloud.com',
        city: 'Darwin',
        country: 'Philippines',
        speciality: 'Anesthesiologist',
        experience: 'ridiculus mus. Proin vel arcu eu',
        qualification: 'PHD',
        rating: 4,
        onboarded: true,
        password: 'A11BD216-B6A8-E2D4-1598-B49AA5D80159',
        hospital: 'Faucibus Orci LLC',
        days: ['Monday', 'Tuesday', 'Saturday', 'Thursday', 'Wednesday'],
        cost: 93,
        times: ['9:30-10:00', '9:00-9:30'],
        img: 'https://randomuser.me/api/portraits/med/men/7.jpg'
    },
    {
        username: 'Ima Jordan',
        email: 'dictum@yahoo.edu',
        city: 'San Ramón',
        country: 'Peru',
        rating: 5,
        speciality: 'Psychiatrist',
        experience: 'non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum',
        qualification: 'BS',
        onboarded: true,
        password: '2015ACC5-73BE-7BD5-1237-656A59B8A5FA',
        hospital: 'Ad Litora Torquent Company',
        days: ['Monday', 'Sunday', 'Saturday', 'Tuesday'],
        cost: 103,
        times: ['13:00-13:30', '15:00-15:30'],
        img: 'https://randomuser.me/api/portraits/med/women/86.jpg'
    },
    {
        username: 'Halla Charles',
        email: 'tincidunt.aliquam@aol.edu',
        city: 'Pietermaritzburg',
        country: 'Austria',
        speciality: 'Radiologist',
        experience: 'massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at',
        qualification: 'MS',
        onboarded: true,
        rating: 2,
        password: 'CBD699D2-32D8-4613-A9BB-5996359DE0FA',
        hospital: 'Egestas Aliquam Corporation',
        days: ['Thursday', 'Friday', 'Saturday', 'Tuesday', 'Sunday'],
        cost: 160,
        times: ['15:30-16:00', '16:30-17:00', '13:00-13:30', '15:00-15:30'],
        img: 'https://randomuser.me/api/portraits/med/men/37.jpg'
    },
    {
        username: 'Madison Shannon',
        email: 'aptent.taciti.sociosqu@yahoo.ca',
        city: 'Tulln an der Donau',
        country: 'Australia',
        speciality: 'Dentist',
        experience: 'eu enim. Etiam imperdiet dictum',
        qualification: 'PHD',
        rating: 5,
        onboarded: true,
        password: 'A5AB6438-6153-71E4-1DBE-FED5513AA535',
        hospital: 'Rutrum Non Associates',
        days: ['Thursday', 'Monday', 'Wednesday'],
        cost: 170,
        times: ['14:00-14:30', '13:00-13:30', '15:30-16:00'],
        img: 'https://randomuser.me/api/portraits/med/women/33.jpg'
    },
    {
        username: 'Brody Martinez',
        email: 'amet.ornare@hotmail.com',
        city: 'Adana',
        country: 'Austria',
        rating: 5,
        speciality: 'Neurologist',
        experience: 'hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium',
        qualification: 'BDS',
        onboarded: true,
        password: 'E56AE0A8-08EA-20A4-E62C-4CAFEE9E1FE6',
        hospital: 'Amet Diam PC',
        days: ['Thursday', 'Monday', 'Friday', 'Sunday', 'Tuesday', 'Saturday'],
        cost: 197,
        times: ['16:30-17:00', '15:30-16:00'],
        img: 'https://randomuser.me/api/portraits/med/women/59.jpg'
    },
    {
        username: 'Iliana Lester',
        email: 'magna@icloud.org',
        city: 'Vallentuna',
        country: 'Peru',
        rating: 3,
        speciality: 'Otolaryngologist',
        experience: 'quam quis diam. Pellentesque',
        qualification: 'MBBS',
        onboarded: true,
        password: '802D27DE-F156-4436-8159-74C6555A1F91',
        hospital: 'Maecenas Mi Corp.',
        days: ['Thursday', 'Wednesday', 'Tuesday', 'Monday'],
        cost: 155,
        times: ['15:30-16:00', '12:30-13:00', '11:30-12:00', '10:30-11:00'],
        img: 'https://randomuser.me/api/portraits/med/men/66.jpg'
    },
    {
        username: 'Trevor Silva',
        email: 'massa@aol.com',
        city: 'Imphal',
        country: 'Chile',
        speciality: 'Dentist',
        experience: 'Morbi',
        qualification: 'MDS',
        rating: 5,
        onboarded: true,
        password: '21581CF2-F86C-96FF-6BCB-DEC8D2F2C6C1',
        hospital: 'Maecenas Malesuada Inc.',
        days: ['Sunday', 'Tuesday', 'Monday', 'Friday', 'Wednesday'],
        cost: 110,
        times: ['12:30-13:00', '16:30-17:00', '15:30-16:00', '9:00-9:30'],
        img: 'https://randomuser.me/api/portraits/med/men/73.jpg'
    }
]

const client = require("./db_config");
client.connect();
async function addData() {
    for (let user of seed) {
        console.log("adding " + user.username);
        await client.query(
            `INSERT INTO "doctors" ("username", "email", "city", "country", "speciality","experience","qualification","onboarded","password","hospital", "days", "cost","times","img", "rating") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`, [user.username, user.email, user.city, user.country, user.speciality, user.experience, user.qualification, user.onboarded, user.password, user.hospital, user.days, user.cost, user.times, user.img, user.rating]
        );
    }
    console.log("DONE")
}

async function addFlag() {
    await client.query(
        `ALTER TABLE doctors ADD COLUMN suspended BOOLEAN DEFAULT FALSE`
    );
    console.log('done')
}

// addFlag();



// addData();

// async function clearDB(){
//     console.log("truncating table")
//     await client.query(
//         `TRUNCATE TABLE patients`
//     )
//     console.log("DONE")
// }

// clearDB();
