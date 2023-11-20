document.addEventListener('DOMContentLoaded', function() {
    const tambahKeKeranjangButtons = document.querySelectorAll('.tambah-ke-keranjang');
    const daftarBelanja = document.querySelector('.daftar-belanja');
    const checkoutButton = document.querySelector('.checkout');
    const strukPembelianElement = document.querySelector('.struk-pembelian');
    const btnUangDiterima = document.querySelector('.btn-uang-diterima');
    const inputUangDiterima = document.querySelector('.input-uang-diterima');
    const btnEdit = document.querySelector('.btn-edit');
    const btnDelete = document.querySelector('.btn-delete');
    const splashScreen = document.getElementById('splash-screen');

    tambahKeKeranjangButtons.forEach(button => {
        button.addEventListener('click', tambahKeKeranjang);
    });

    checkoutButton.addEventListener('click', checkout);
    btnUangDiterima.addEventListener('click', tambahUangDiterima);
    btnEdit.addEventListener('click', aksiEdit);
    btnDelete.addEventListener('click', aksiDelete);

    function tambahKeKeranjang(event) {
        const item = event.target.parentElement;
        const namaItem = item.querySelector('h2').innerText;
        const hargaItem = item.querySelector('p').innerText;

        const li = document.createElement('li');
        li.innerText = `${namaItem} - ${hargaItem}`;
        daftarBelanja.appendChild(li);
    }

    function checkout() {
        const daftarItem = [];
        let totalHarga = 0;

        daftarBelanja.querySelectorAll('li').forEach(item => {
            const itemText = item.innerText;
            const hargaText = itemText.match(/Rp\s([\d.,]+)/)[1];
            const harga = parseFloat(hargaText.replace(/[.,]/g, '').replace(',', '.'));
            totalHarga += harga;
            daftarItem.push(itemText);
        });

        const rupiahFormatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        });

        const uangDiterima = parseFloat(inputUangDiterima.value);
        if (!isNaN(uangDiterima)) {
            const kembalian = uangDiterima - totalHarga;

            const tanggalPembelian = new Date().toLocaleDateString('id-ID', {
                // ... (Bagian tanggal pembelian sebelumnya)
            });

            let strukPembelian = `
          ================================
          Kafe XYZ - Struk Pembelian
          ================================
          Tanggal: ${tanggalPembelian}
          -------------------------------
          Item yang Dipesan:\n`;

            daftarItem.forEach((item, index) => {
                strukPembelian += `${index + 1}. ${item}\n`;
            });

            strukPembelian += `-------------------------------
          Total Harga: ${rupiahFormatter.format(totalHarga)}
          -------------------------------
          Uang yang Diterima: ${rupiahFormatter.format(uangDiterima)}
          -------------------------------
          Kembalian: ${rupiahFormatter.format(kembalian)}
          ================================
          Terima kasih telah berkunjung!
          `;

            strukPembelianElement.innerText = strukPembelian;
            daftarBelanja.innerHTML = '';
        } else {
            alert('Masukkan jumlah uang yang valid!');
        }
    }

    function aksiEdit() {
        // Logika untuk aksi Edit di sini
        console.log('Aksi Edit');
    }

    function aksiDelete() {
        // Logika untuk aksi Delete di sini
        hapusDariStrukPembelian();
    }

    function hapusDariStrukPembelian() {
        const strukPembelian = document.querySelector('.struk-pembelian');
        strukPembelian.removeChild(strukPembelian.lastChild);
    }

    function tambahUangDiterima() {
        // ... (Fungsi tambahUangDiterima sebelumnya)
    }

    // Splash Screen
    setTimeout(() => {
        splashScreen.style.display = 'none';
    }, 3000); // Ubah angka (dalam milidetik) sesuai keinginan Anda
});