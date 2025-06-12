import React, { useState, useMemo } from 'react';
import { Home, Trash2, History, Award, User, Star, MapPin, Calendar, Camera, ChevronRight, Search, Filter, Gift, Ticket, LogOut, Settings, HelpCircle, Shield, ChevronsUpDown, Check, X, Bell, MessageSquare, ArrowLeft, PlusCircle, MinusCircle, Eye, EyeOff } from 'lucide-react';

// Mock Data (Data Tiruan)
// ==============================================================================
const mockUser = {
  name: 'Wensel',
  email: 'wensel@ecoguard.com',
  profilePicture: 'https://placehold.co/100x100/A8D5BA/333333?text=W',
  joinDate: '2023-01-15',
  level: 'Eco Hero',
  currentPoints: 4250,
  totalWeight: 125.8, // in kg
  totalTransactions: 32,
  savedAddresses: [
    { id: 1, name: 'Rumah', address: 'Jl. Merdeka No. 17, Jakarta Pusat' },
    { id: 2, name: 'Kantor', address: 'Gedung Cyber, Lt. 10, Jl. Sudirman, Jakarta Selatan' },
  ],
};

const mockActivityHistory = [
  {
    id: 'TRX001',
    date: '2025-06-08T14:30:00Z',
    items: [
      { type: 'Plastik', weight: 2.5, points: 25 },
      { type: 'Kertas', weight: 1.0, points: 5 },
    ],
    status: 'Selesai',
    pointsEarned: 30,
    mitra: { name: 'Budi Santoso', rating: 5 },
    photo: 'https://placehold.co/300x200/cccccc/ffffff?text=Sampah+TRX001',
    notes: 'Sampah diletakkan di depan pagar dalam kantong hijau.'
  },
  {
    id: 'TRX002',
    date: '2025-06-05T10:00:00Z',
    items: [{ type: 'Logam', weight: 3.0, points: 45 }],
    status: 'Selesai',
    pointsEarned: 45,
    mitra: { name: 'Citra Lestari', rating: 4 },
  },
  {
    id: 'TRX003',
    date: '2025-06-10T09:00:00Z',
    items: [{ type: 'Kaca', weight: 5.2, points: 52 }],
    status: 'Dijadwalkan',
    pointsEarned: 52,
    mitra: { name: 'Doni Firmansyah' },
  },
  {
    id: 'TRX004',
    date: '2025-06-01T11:00:00Z',
    items: [{ type: 'Elektronik', weight: 1.5, points: 30 }],
    status: 'Ditolak',
    pointsEarned: 0,
    mitra: { name: 'Budi Santoso' },
    reason: 'Barang elektronik tidak sesuai kriteria (baterai masih terpasang).',
  },
    {
    id: 'TRX005',
    date: '2025-05-28T16:00:00Z',
    items: [
        { type: 'Tekstil', weight: 2.0, points: 10 },
        { type: 'Plastik', weight: 3.0, points: 30 },
    ],
    status: 'Selesai',
    pointsEarned: 40,
    mitra: { name: 'Citra Lestari', rating: 5 },
    photo: 'https://placehold.co/300x200/cccccc/ffffff?text=Sampah+TRX005',
  },
];


const mockRewards = [
  { id: 'RWD01', title: 'Voucher Tokopedia Rp 25.000', points: 2500, type: 'voucher', image: 'https://placehold.co/150x100/2ECC71/FFFFFF?text=Voucher' },
  { id: 'RWD02', title: 'Pulsa Telkomsel Rp 10.000', points: 1200, type: 'pulsa', image: 'https://placehold.co/150x100/3498DB/FFFFFF?text=Pulsa' },
  { id: 'RWD03', title: 'Tas Kain Eco-Friendly', points: 3000, type: 'barang', image: 'https://placehold.co/150x100/9B59B6/FFFFFF?text=Tas+Kain' },
  { id: 'RWD04', title: 'Donasi 1 Pohon', points: 5000, type: 'donasi', image: 'https://placehold.co/150x100/F1C40F/FFFFFF?text=Pohon' },
  { id: 'RWD05', title: 'Voucher Alfamart Rp 50.000', points: 5000, type: 'voucher', image: 'https://placehold.co/150x100/E74C3C/FFFFFF?text=Voucher' },
  { id: 'RWD06', title: 'Botol Minum Stainless', points: 4500, type: 'barang', image: 'https://placehold.co/150x100/1ABC9C/FFFFFF?text=Botol' },
];

const mockEducation = [
  { id: 'EDU01', type: 'Artikel', title: 'Cara Mudah Memilah Sampah Plastik di Rumah', image: 'https://placehold.co/300x150/A8D5BA/333333?text=Artikel' },
  { id: 'EDU02', type: 'Video', title: 'Kampanye Minggu Hijau: Apa Saja Kegiatannya?', image: 'https://placehold.co/300x150/82C09A/333333?text=Video' },
  { id: 'EDU03', type: 'Tips', title: 'Tantangan #BebasSampah: Mulai dari Diri Sendiri', image: 'https://placehold.co/300x150/5FAD7E/333333?text=Tips' },
];

const wasteTypes = [
    { id: 'plastik', name: 'Plastik', icon: '♻️', pointsPerKg: 10 },
    { id: 'kertas', name: 'Kertas', icon: '📄', pointsPerKg: 5 },
    { id: 'logam', name: 'Logam', icon: '🔩', pointsPerKg: 15 },
    { id: 'kaca', name: 'Kaca', icon: '🍾', pointsPerKg: 10 },
    { id: 'elektronik', name: 'Elektronik', icon: '🔌', pointsPerKg: 20 },
    { id: 'tekstil', name: 'Tekstil', icon: '👕', pointsPerKg: 5 },
];


// Reusable UI Components
// ==============================================================================

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md p-4 sm:p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = '', variant = 'primary', icon: Icon, type = 'button', disabled = false }) => {
  const baseClasses = 'w-full text-center py-3 px-4 rounded-lg font-bold text-base transition-transform transform active:scale-95 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-green-600 hover:bg-green-700 text-white shadow-lg',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    outline: 'bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-50',
  };
  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`} disabled={disabled}>
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'setor', label: 'Setor', icon: Trash2 },
    { id: 'aktivitas', label: 'Aktivitas', icon: History },
    { id: 'reward', label: 'Reward', icon: Award },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-1/5 py-2 transition-colors duration-200 ${
              activeTab === item.id ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className={`text-xs mt-1 ${activeTab === item.id ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const Header = ({ title, onBack }) => (
    <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-40 p-4 shadow-sm flex items-center">
        {onBack && (
            <button onClick={onBack} className="mr-4 text-gray-600 hover:text-gray-900">
                <ArrowLeft size={24} />
            </button>
        )}
        <h1 className="font-poppins font-bold text-xl text-gray-800">{title}</h1>
    </div>
);


// Page Components
// ==============================================================================

// --- Login Page ---
const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login logic
        if (email === 'wensel@ecoguard.com' && password === 'wensel123') {
            setError('');
            onLogin();
        } else {
            setError('Email atau password salah. Coba lagi.');
        }
    };

    return (
        <div className="flex flex-col justify-center min-h-screen bg-green-50 p-6">
            <div className="max-w-md w-full mx-auto">
                <div className="text-center mb-8">
                    <Trash2 className="mx-auto text-green-600" size={48} />
                    <h1 className="font-poppins font-extrabold text-4xl mt-2 text-gray-800">EcoGuard</h1>
                    <p className="text-gray-600">Selamat datang kembali!</p>
                </div>
                
                <Card className="shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                placeholder="anda@email.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password"className="block text-sm font-bold text-gray-700">Password</label>
                             <div className="mt-1 relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="••••••••"
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-500"/> : <Eye className="h-5 w-5 text-gray-500"/>}
                                </button>
                            </div>
                        </div>
                        
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <div>
                            <Button type="submit" variant="primary">Login</Button>
                        </div>

                        <div className="text-center text-sm">
                            <a href="#" className="font-medium text-green-600 hover:text-green-500">
                                Lupa password?
                            </a>
                        </div>
                    </form>
                </Card>
                <p className="text-center text-sm text-gray-500 mt-8">
                    Belum punya akun? <a href="#" className="font-medium text-green-600 hover:text-green-500">Daftar sekarang</a>
                </p>
            </div>
        </div>
    );
};


// --- Beranda (Home) Page ---
const BerandaPage = ({ user, onActionClick }) => {
    return (
        <div className="p-4 space-y-6">
            <div className="bg-green-50 rounded-xl p-4">
                <h1 className="font-poppins font-bold text-2xl text-gray-800">Halo, {user.name.split(' ')[0]}!</h1>
                <p className="text-gray-600">Siap untuk membuat bumi lebih hijau hari ini?</p>
            </div>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm opacity-80">Total Setoran Bulan Ini</p>
                        <p className="font-poppins font-bold text-2xl">8.3 kg</p>
                    </div>
                    <div>
                         <p className="text-sm opacity-80 text-right">Poin Kamu</p>
                        <p className="font-poppins font-bold text-2xl text-right">{user.currentPoints.toLocaleString()}</p>
                    </div>
                </div>
                 <div className="mt-4 pt-4 border-t border-white/20">
                     <p className="text-sm opacity-80">Jadwal Penjemputan Terdekat</p>
                     <p className="font-bold">Besok, 10 Jun 2025 (Dalam Proses)</p>
                 </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                 <Button onClick={() => onActionClick('setor')} variant="primary" icon={Trash2}>Setor Sampah</Button>
                 <Button onClick={() => onActionClick('aktivitas')} variant="secondary" icon={History}>Lihat Riwayat</Button>
            </div>
            
            <div>
                 <h2 className="font-poppins font-bold text-lg text-gray-800 mb-3">Edukasi & Kampanye Hijau</h2>
                 <div className="space-y-4">
                     {mockEducation.map(item => (
                         <div key={item.id} className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer">
                             <img src={item.image} alt={item.title} className="w-full h-full object-cover"/>
                             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all"></div>
                             <div className="absolute bottom-0 left-0 p-4">
                                 <span className="bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">{item.type}</span>
                                 <h3 className="text-white font-bold mt-1">{item.title}</h3>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>

            <Card className="bg-yellow-100 border-l-4 border-yellow-400">
                <div className="flex items-center gap-4">
                    <Bell size={24} className="text-yellow-500"/>
                    <div>
                        <h3 className="font-bold text-yellow-800">Notifikasi Penting</h3>
                        <p className="text-sm text-yellow-700">Tukar 1000 poin, dapatkan voucher belanja sekarang!</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

// --- Setor Sampah Page ---
const SetorSampahPage = ({ onBack, onSubmit }) => {
    const [selectedWaste, setSelectedWaste] = useState([]);
    const [weight, setWeight] = useState(2.5);
    const [pickupDate, setPickupDate] = useState(new Date().toISOString().split('T')[0]);
    const [pickupTime, setPickupTime] = useState('Pagi (08:00 - 12:00)');
    const [location, setLocation] = useState(mockUser.savedAddresses[0].address);
    const [photo, setPhoto] = useState(null);
    const [notes, setNotes] = useState('');
    
    const estimatedPoints = useMemo(() => {
        if (selectedWaste.length === 0) return 0;
        const totalPoints = selectedWaste.reduce((acc, currentWasteId) => {
            const wasteInfo = wasteTypes.find(w => w.id === currentWasteId);
            // This logic is slightly flawed as it multiplies total weight by pointsPerKg for each type. 
            // A more accurate system would have weight per type. For this mock, we'll keep it simple.
            return acc + (wasteInfo.pointsPerKg * weight);
        }, 0);
        return Math.round(totalPoints / selectedWaste.length); // Averaging points
    }, [selectedWaste, weight]);

    const handleWasteToggle = (wasteId) => {
        setSelectedWaste(prev => 
            prev.includes(wasteId) ? prev.filter(id => id !== wasteId) : [...prev, wasteId]
        );
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = { selectedWaste, weight, pickupDate, pickupTime, location, photo, notes, estimatedPoints };
        console.log("Form submitted:", formData);
        onSubmit(formData);
    };

    return (
        <div>
            <Header title="Setor Sampah" onBack={onBack} />
            <div className="p-4 space-y-6">
                <form onSubmit={handleFormSubmit}>
                    {/* 1. Pilih Jenis Sampah */}
                    <div className="mb-6">
                        <label className="font-poppins font-bold text-lg text-gray-800 mb-3 block">1. Pilih Jenis Sampah</label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {wasteTypes.map(waste => (
                                <button type="button" key={waste.id} onClick={() => handleWasteToggle(waste.id)}
                                    className={`p-3 border-2 rounded-lg text-center transition-all ${selectedWaste.includes(waste.id) ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-gray-200'}`}>
                                    <span className="text-2xl">{waste.icon}</span>
                                    <p className="text-sm font-semibold mt-1">{waste.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Estimasi Berat */}
                    <div className="mb-6">
                        <label htmlFor="weight" className="font-poppins font-bold text-lg text-gray-800 mb-3 block">2. Estimasi Berat (kg)</label>
                        <div className="flex items-center gap-4">
                           <MinusCircle onClick={() => setWeight(w => Math.max(0.5, w - 0.5))} className="text-green-600 cursor-pointer"/>
                            <input type="range" min="0.5" max="20" step="0.5" value={weight} onChange={e => setWeight(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
                            <PlusCircle onClick={() => setWeight(w => Math.min(20, w + 0.5))} className="text-green-600 cursor-pointer"/>
                        </div>
                         <div className="text-center font-bold text-green-700 text-lg mt-2">{weight} kg</div>
                    </div>
                    
                    {/* 3. Jadwal Penjemputan */}
                    <div className="mb-6">
                         <label className="font-poppins font-bold text-lg text-gray-800 mb-3 block">3. Jadwal Penjemputan</label>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-green-500 focus:border-green-500"/>
                             <select value={pickupTime} onChange={e => setPickupTime(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white">
                                 <option>Pagi (08:00 - 12:00)</option>
                                 <option>Siang (12:00 - 15:00)</option>
                                 <option>Sore (15:00 - 18:00)</option>
                                 <option>Jemput Secepatnya</option>
                             </select>
                         </div>
                    </div>

                    {/* 4. Lokasi Penjemputan */}
                    <div className="mb-6">
                        <label className="font-poppins font-bold text-lg text-gray-800 mb-3 block">4. Lokasi Penjemputan</label>
                        <div className="flex items-center p-3 border-2 border-gray-200 rounded-lg">
                           <MapPin className="text-gray-500 mr-3"/>
                           <p className="flex-grow">{location}</p>
                           <button type="button" className="text-green-600 font-bold">Ubah</button>
                        </div>
                    </div>

                    {/* 5. Unggah Foto & Catatan */}
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                             <label className="font-poppins font-bold text-lg text-gray-800 mb-3 block">5. Unggah Foto</label>
                             <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Camera className="w-8 h-8 mb-2 text-gray-500"/>
                                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Klik untuk unggah</span></p>
                                        {photo && <p className="text-xs text-green-600">{photo.name}</p>}
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={e => setPhoto(e.target.files[0])} />
                                </label>
                            </div> 
                        </div>
                        <div>
                            <label htmlFor="notes" className="font-poppins font-bold text-lg text-gray-800 mb-3 block">6. Catatan Tambahan</label>
                            <textarea id="notes" rows="3" value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="Contoh: Sampah ada di depan pagar"></textarea>
                        </div>
                    </div>
                    
                    {/* Estimasi & Konfirmasi */}
                    <Card className="my-6 bg-green-50">
                        <p className="text-center text-gray-700">Perkiraan Poin yang Didapat:</p>
                        <p className="text-center font-poppins font-extrabold text-3xl text-green-600 my-2">{estimatedPoints} Poin</p>
                    </Card>

                    <Button type="submit" variant="primary" icon={Trash2} disabled={selectedWaste.length === 0}>
                        Konfirmasi Setor Sekarang
                    </Button>
                </form>
            </div>
        </div>
    )
};

const ConfirmationPage = ({ onBackToHome }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4 text-center">
        <div className="bg-green-100 rounded-full p-6 mb-6">
            <Check size={64} className="text-green-600" />
        </div>
        <h1 className="font-poppins font-bold text-2xl text-gray-800">Setoran Dikonfirmasi!</h1>
        <p className="text-gray-600 mt-2 mb-8 max-w-sm">
            Jadwal penjemputanmu telah berhasil dibuat. Mitra kami akan segera menghubungimu. Kamu bisa melacak statusnya di halaman Aktivitas.
        </p>
        <Button onClick={onBackToHome} variant="primary">Kembali ke Beranda</Button>
    </div>
);


// --- Aktivitas & Riwayat Page ---
const AktivitasPage = ({ history, onSelectTransaction, onBack }) => {
    const [filter, setFilter] = useState('Semua');
    const [search, setSearch] = useState('');

    const filteredHistory = useMemo(() => {
        return history
            .filter(item => filter === 'Semua' || item.status === filter)
            .filter(item => 
                item.id.toLowerCase().includes(search.toLowerCase()) || 
                item.items.some(waste => waste.type.toLowerCase().includes(search.toLowerCase()))
            );
    }, [history, filter, search]);

    const getStatusChip = (status) => {
        switch (status) {
            case 'Selesai': return 'bg-green-100 text-green-800';
            case 'Dijadwalkan': return 'bg-blue-100 text-blue-800';
            case 'Ditolak': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    return (
        <div>
            <Header title="Aktivitas & Riwayat" onBack={onBack}/>
            <div className="p-4 space-y-4">
                {/* Stats Panel */}
                <Card className="bg-green-50 grid grid-cols-3 divide-x divide-green-200 text-center">
                    <div>
                        <p className="font-poppins font-bold text-lg text-green-700">{mockUser.totalWeight} kg</p>
                        <p className="text-xs text-green-600">Total Setoran</p>
                    </div>
                     <div>
                        <p className="font-poppins font-bold text-lg text-green-700">{mockUser.totalTransactions}</p>
                        <p className="text-xs text-green-600">Transaksi</p>
                    </div>
                     <div>
                        <p className="font-poppins font-bold text-lg text-green-700">{mockUser.currentPoints.toLocaleString()}</p>
                        <p className="text-xs text-green-600">Total Poin</p>
                    </div>
                </Card>

                {/* Filter & Search */}
                <div className="flex gap-2">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                        <input type="text" placeholder="Cari transaksi..." value={search} onChange={e => setSearch(e.target.value)}
                         className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <select value={filter} onChange={e => setFilter(e.target.value)} className="p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-green-500 focus:border-green-500">
                        <option>Semua</option>
                        <option>Selesai</option>
                        <option>Dijadwalkan</option>
                        <option>Ditolak</option>
                    </select>
                </div>

                {/* History List */}
                <div className="space-y-4">
                    {filteredHistory.map(item => (
                        <Card key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectTransaction(item)}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-gray-800">ID: {item.id}</p>
                                    <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusChip(item.status)}`}>{item.status}</span>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                               <div>
                                   <p className="text-sm text-gray-600">
                                       {item.items.map(i => `${i.type} (${i.weight} kg)`).join(', ')}
                                   </p>
                               </div>
                               <div className="text-right">
                                    <p className="font-bold text-green-600">+{item.pointsEarned} Poin</p>
                               </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

const TransactionDetailPage = ({ transaction, onBack }) => {
    if (!transaction) return null;

    const getStatusInfo = (status) => {
        switch (status) {
            case 'Selesai': return { chip: 'bg-green-100 text-green-800', icon: <Check size={20} className="text-green-600"/>, text: "Penjemputan telah selesai."};
            case 'Dijadwalkan': return { chip: 'bg-blue-100 text-blue-800', icon: <Calendar size={20} className="text-blue-600"/>, text: "Penjemputan telah dijadwalkan."};
            case 'Ditolak': return { chip: 'bg-red-100 text-red-800', icon: <X size={20} className="text-red-600"/>, text: "Penjemputan ditolak."};
            default: return { chip: 'bg-gray-100 text-gray-800', icon: <History size={20} className="text-gray-600"/>, text: "Status tidak diketahui." };
        }
    };
    
    const statusInfo = getStatusInfo(transaction.status);

    return (
         <div>
            <Header title={`Detail Transaksi ${transaction.id}`} onBack={onBack}/>
            <div className="p-4 space-y-4">
                <Card>
                    <div className="flex items-center gap-3">
                        {statusInfo.icon}
                        <div>
                             <p className="font-bold">{statusInfo.text}</p>
                             <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusInfo.chip}`}>{transaction.status}</span>
                        </div>
                    </div>
                    {transaction.status === 'Ditolak' && transaction.reason && (
                        <p className="mt-2 text-sm bg-red-50 p-2 rounded-md text-red-700">{transaction.reason}</p>
                    )}
                </Card>
                
                {transaction.photo && (
                    <Card>
                        <h3 className="font-bold mb-2">Foto Sampah</h3>
                        <img src={transaction.photo} alt="Foto Sampah" className="rounded-lg w-full"/>
                    </Card>
                )}

                <Card>
                    <h3 className="font-bold mb-2">Detail Setoran</h3>
                    <ul className="space-y-2">
                        {transaction.items.map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-sm">
                                <span>{item.type} ({item.weight} kg)</span>
                                <span className="font-semibold text-gray-700">+{item.points} Poin</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t font-bold">
                        <span>Total Poin Didapat</span>
                        <span className="text-green-600">+{transaction.pointsEarned} Poin</span>
                    </div>
                </Card>

                <Card>
                    <h3 className="font-bold mb-2">Informasi Penjemputan</h3>
                    <p className="text-sm"><strong>Tanggal:</strong> {new Date(transaction.date).toLocaleString('id-ID')}</p>
                    <p className="text-sm"><strong>Mitra:</strong> {transaction.mitra.name}</p>
                    {transaction.notes && <p className="text-sm mt-2"><strong>Catatan:</strong> "{transaction.notes}"</p>}
                </Card>
                
                {transaction.status === 'Selesai' && (
                    <Card>
                         <h3 className="font-bold mb-2">Ulasan Anda</h3>
                         {transaction.mitra.rating ? (
                             <div className="flex items-center gap-2">
                                 <div className="flex">
                                     {[...Array(5)].map((_, i) => (
                                         <Star key={i} size={20} className={i < transaction.mitra.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}/>
                                     ))}
                                 </div>
                                 <span className="font-bold">{transaction.mitra.rating}.0</span>
                             </div>
                         ) : (
                             <div>
                                 <p className="text-sm mb-2">Beri penilaian untuk Mitra</p>
                                 <Button variant="outline">Beri Ulasan</Button>
                             </div>
                         )}
                    </Card>
                )}

                {transaction.status === 'Dijadwalkan' && (
                     <Button variant="secondary" icon={MessageSquare}>
                        Hubungi Mitra
                    </Button>
                )}
            </div>
        </div>
    )
}

// --- Reward Page ---
const RewardPage = ({ user, rewards, onBack }) => {
    return (
        <div>
            <Header title="Reward & Poin" onBack={onBack}/>
            <div className="p-4 space-y-6">
                <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white text-center">
                    <p className="opacity-80">Total Poin Kamu</p>
                    <p className="font-poppins font-extrabold text-5xl my-2">{user.currentPoints.toLocaleString()}</p>
                    <p className="text-sm opacity-80">1 Poin ≈ Rp 10</p>
                </Card>

                <div className="flex gap-2">
                    <Button variant="primary" icon={Gift}>Tukar Poin</Button>
                    <Button variant="secondary" icon={History}>Riwayat Poin</Button>
                </div>
                
                <div>
                    <h2 className="font-poppins font-bold text-lg text-gray-800 mb-3">Katalog Reward</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {rewards.map(reward => (
                            <Card key={reward.id} className="p-0 overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
                                <img src={reward.image} alt={reward.title} className="w-full h-24 object-cover"/>
                                <div className="p-3 flex flex-col flex-grow">
                                    <h3 className="font-bold text-sm flex-grow">{reward.title}</h3>
                                    <p className="text-green-600 font-bold mt-2">{reward.points.toLocaleString()} Poin</p>
                                    <button className="w-full bg-green-100 text-green-700 text-xs font-bold py-1 mt-2 rounded-md hover:bg-green-200">
                                        Tukar
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <Card className="bg-blue-50">
                     <h3 className="font-bold text-blue-800">Undang Teman, Dapat Poin!</h3>
                     <p className="text-sm text-blue-700 my-2">Bagikan kode referal unikmu dan dapatkan 500 poin untuk setiap teman yang mendaftar dan melakukan setoran pertama!</p>
                     <div className="flex gap-2 p-2 bg-blue-100 rounded-md">
                        <p className="font-mono text-blue-900 flex-grow">ECO-WENSEL24</p>
                        <button className="text-blue-600 font-bold">Salin</button>
                     </div>
                </Card>

            </div>
        </div>
    );
};

// --- Profile Page ---
const ProfilPage = ({ user, onLogout, onBack }) => {
    const menuItems = [
        { icon: User, label: 'Informasi Akun', hasChevron: true },
        { icon: MapPin, label: 'Alamat Tersimpan', hasChevron: true },
        { icon: Bell, label: 'Notifikasi', hasChevron: false, isToggle: true },
        { icon: Settings, label: 'Pengaturan Aplikasi', hasChevron: true },
        { icon: HelpCircle, label: 'Bantuan & FAQ', hasChevron: true },
        { icon: Shield, label: 'Kebijakan Privasi', hasChevron: true },
    ];
    
    return (
        <div>
            <Header title="Profil" onBack={onBack}/>
            <div className="p-4 pb-24 space-y-6">
                {/* User Info */}
                <div className="flex items-center gap-4">
                    <img src={user.profilePicture} alt="User" className="w-20 h-20 rounded-full object-cover shadow-md"/>
                    <div>
                        <h2 className="font-poppins font-bold text-xl">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                        <span className="mt-1 inline-block bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">{user.level}</span>
                    </div>
                </div>

                {/* Stats */}
                 <Card className="grid grid-cols-3 divide-x text-center">
                    <div>
                        <p className="font-bold text-lg">{user.totalWeight} kg</p>
                        <p className="text-xs text-gray-500">Total Setoran</p>
                    </div>
                     <div>
                        <p className="font-bold text-lg">{user.currentPoints.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Total Poin</p>
                    </div>
                     <div>
                        <p className="font-bold text-lg">{user.totalTransactions}</p>
                        <p className="text-xs text-gray-500">Transaksi</p>
                    </div>
                </Card>

                {/* Menu */}
                <Card className="p-2">
                    <ul className="divide-y divide-gray-100">
                       {menuItems.map(item => (
                           <li key={item.label} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                               <div className="flex items-center gap-4">
                                   <item.icon className="text-gray-600" size={22}/>
                                   <span className="font-semibold text-gray-700">{item.label}</span>
                               </div>
                               {item.hasChevron && <ChevronRight className="text-gray-400" size={20}/>}
                               {item.isToggle && (
                                   <label className="relative inline-flex items-center cursor-pointer">
                                      <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                    </label>
                               )}
                           </li>
                       ))}
                    </ul>
                </Card>

                <Button onClick={onLogout} variant="outline" icon={LogOut}>
                    Logout
                </Button>
                
                <p className="text-center text-xs text-gray-400">EcoGuard v1.0.0</p>
            </div>
        </div>
    );
};

// Main App Component
// ==============================================================================
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('beranda');
  const [pageState, setPageState] = useState({ name: 'main', data: null }); // name: 'main', 'setor-sampah', 'konfirmasi', 'detail-transaksi'

  const handleLogin = () => {
    setIsAuthenticated(true);
    setActiveTab('beranda');
    setPageState({ name: 'main', data: null });
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleSetorSubmit = (formData) => {
    console.log("Submitting waste deposit:", formData);
    setPageState({ name: 'konfirmasi', data: null });
  };
  
  const handleSelectTransaction = (transaction) => {
      setPageState({ name: 'detail-transaksi', data: transaction });
  };

  const navigateBackToTab = () => {
      setPageState({ name: 'main', data: null });
  };

  const renderAppContent = () => {
    if (pageState.name === 'setor-sampah') {
        return <SetorSampahPage onBack={navigateBackToTab} onSubmit={handleSetorSubmit}/>
    }
    if (pageState.name === 'konfirmasi') {
        return <ConfirmationPage onBackToHome={() => {
            setActiveTab('beranda');
            setPageState({ name: 'main', data: null });
        }}/>
    }
    if (pageState.name === 'detail-transaksi') {
        return <TransactionDetailPage transaction={pageState.data} onBack={navigateBackToTab} />
    }

    // Main tab content
    switch (activeTab) {
      case 'beranda':
        return <BerandaPage user={mockUser} onActionClick={(tab) => {
            if (tab === 'setor') {
                setPageState({ name: 'setor-sampah', data: null });
            } else {
                setActiveTab(tab);
            }
        }} />;
      case 'setor':
        // The primary action is now on the setor-sampah page
        return <SetorSampahPage onBack={() => setActiveTab('beranda')} onSubmit={handleSetorSubmit}/>;
      case 'aktivitas':
        return <AktivitasPage history={mockActivityHistory} onSelectTransaction={handleSelectTransaction} />;
      case 'reward':
        return <RewardPage user={mockUser} rewards={mockRewards} />;
      case 'profil':
        return <ProfilPage user={mockUser} onLogout={handleLogout} />;
      default:
        return <BerandaPage user={mockUser} onActionClick={() => {}}/>;
    }
  };
  
  const showNav = isAuthenticated && (pageState.name === 'main' || pageState.name === 'detail-transaksi');

  return (
    <div className="font-inter bg-gray-50 min-h-screen">
       <style>
        {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght-700;800;900&family=Inter:wght@400;500;600;700&display=swap');
            .font-poppins { font-family: 'Poppins', sans-serif; }
            .font-inter { font-family: 'Inter', sans-serif; }
        `}
      </style>
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl">
        {isAuthenticated ? (
            <>
                <main className={`pb-24 transition-all duration-300`}>
                    {renderAppContent()}
                </main>
                {showNav && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
            </>
        ) : (
            <LoginPage onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}
