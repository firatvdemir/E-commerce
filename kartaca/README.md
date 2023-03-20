# E-Commerce App

- *Registiration key :* `c4a9a4b50e409e5949c9b316c1f5da58e5b5918172ce07131daf4b4d22a42bb3`   
- *Mail :* `firatfiratdemir@gmail.com`
- [*Live Demo!*](https://youtu.be/bL4_5UfSEhY)

E-Commerce Full Stack uygulaması Kartaca Bilişim A.Ş. staj programı için **sıfırdan** yapıldı. Back-end kısmında *Django*, Front-end kısmında ise *React* kullanıldı. Veri tabanı olarak ise Django'da standart olarak gelen *SQlite* kullanıldı. Kütüphane olarak Django'da çapraz istekleri yönetmek için `corsheaders` kütüphanesi kullanıldı. React'de ise end-point yönetimi için `react-router` ve UI(User Interface) olarak da `bootstrap` kütüphanesi kullanıldı. Önceliklikle uygulamayı Çalıştırmak için gerekli aşamalardan bahsedilip, ardından back-end ve front-end kısımlarındaki önemli yerlerin gerekli açıklamaları yapılacaktır.

## Çalıştırma Aşamaları
Uygulamadaki root dosya kartaca adındaki dosyadır. Bu dosyanın içinde 3 adet element bulunmaktadır. Bunlar;
 - `django`
 - `react`
 - `README.md`   
 
dosyalarıdır. Burada `django` uygulamanın tüm back-end dosyalarının olduğu konum iken, `react` kısmında ise tüm front-end dosyaları bulunmaktadır. Öncelikle back-end kısmındaki gerekli paketleri yükleyelim. VS Code terminalinde sırasıyla aşağıdaki komutları yazarak Django dosyalarının konumuna ulaşalım.  

- `cd django`
- `cd kartaca`  

Daha sonra uygulamanın çalışması için gerekli paketleri yükleyelim. 

- `python -m pip install Django`
- `python -m pip install django-cors-headers`

Paketleri yükledikten sonra `manage.py` dosyasının olduğu konumda olduğumuzdan emin olarak, `python manage.py runserver` diyerek uygulamanın back-end kısmını çalıştıralım, Bu işlemden sonra terminali `split` komutu ile ikiye bölerek diğer terminalde front-end kısmının ayarlarına geçelim.

Çatı klasörden başlayarak, aşağıdaki komutlar ile react uygulamasına geçelim.

- `cd react`
- `cd commerce`

Bu konumda `npm install` yazarak gerekli tüm paket yükleme işlemlerini *React*'e bırakalım. Birkaç dakika sonra işlem bittikten sonra, 

- `npm start` 

yazarak front-end kısmını da devreye alarak uygulamayı kullanmaya başlayabiliriz. 
