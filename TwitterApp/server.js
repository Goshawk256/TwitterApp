const express = require('express');
const cors = require('cors');// cors middleware'ini ekledik
const fs = require('fs');
const app = express();

// JSON dosyasını okuma
const jsonData = fs.readFileSync('data.json', 'utf-8');
const usersData = JSON.parse(jsonData);

// cors middleware'ini kullan
app.use(cors());

// Kullanıcıları içeren hash tablosunu oluştur
const userHash = {};
usersData.forEach(user => {
    userHash[user.username] = {
        name: user.name,
        followers_count: user.followers_count,
        following_count: user.following_count,
        tweets_count: user.tweets.length
// Diğer istediğin bilgileri ekleyebilirsin
    };
});



// Fonksiyon: Belirli bir kullanıcı adına sahip kullanıcının bilgilerini göster
function getUserInfo(username) {
    return usersData.find(userData => userData.username === username);
}

app.use(express.static('public'));

// "/hash" endpoint'i
app.get('/hash', (req, res) => {
    res.json(userHash);
});

app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    const user = getUserInfo(username);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send('Kullanıcı bulunamadı.');
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});


