# Alphitter  -- 和朋友交流的社交平台
<br>

### <a href="https://ansticefish.github.io/simple-twitter-front-end/#/signIn"> 點我到網站，直接玩看看！ </a>
<br>

> # 功能介紹
<br>

<img src="./src/assets/icons/front.PNG">
<br>
<br>

## <strong> 前台 <strong>
<br>

* 前台擁有和 Twitter 相似的社交功能，在這裡你能：
  * 註冊個人帳號
  * 打造個人profile
  * 用按讚、追蹤、推文、回覆推文的方式與其他使用者互動

<br>

## <strong> 後台管理 <strong>
<br>

<img src="./src/assets/icons/back.PNG">
<br>
<br>

* 透過管理員帳號(帳號：root；密碼：12345678)你能快速掌握前台資訊，進行：
  * 推文管理：刪除使用者推文
  * 掌握使用者資訊：可以看見網站上的所有使用者與活躍程度
<br>
<br>


> # 環境與規格
<br>

* Alphitter 採用 Vue 2 打造，並使用 Vue Router 建立路由

<br>

> # 安裝說明
<br>

<strong>從來沒有使用過終端機的人，請先做相關設定！</strong>
<br>

<strong>Mac使用者請參照Mac版的說明，Windows使用者請參照Windows版的說明</strong>
<br>

<strong>若已經安裝過Node.js，可直接跳至「下載專案」區！</strong>

<br>

> ## 環境設定 (安裝Git與Node.js)
<br>

 ## Mac使用者：
<br>

  * 打開應用程式庫裡的「terminal」軟體
<br>

  * 安裝Homebrew：輸入下方指令並按Enter
<br>
<br>
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
<br>

  * 看到最後一行出現"Password"時，請輸入電腦開機時的密碼！
<br>

  * 當terminal出現以下訊息，按Enter鍵
<br>
<br>

```
Press RETURN to continue or any other key to abort
```
<br>

  * 出現"installation successful!"表示安裝成功，也可輸入以下指令，若出現版本號(如：Homebrew 2.5.8)，就表示成功！
<br>
<br>

```
brew --version
```
<br>

  * 輸入以下指令，安裝Git
<br>
<br>

```
brew install git
```
<br>

  * 接著輸入下列指令，若有出現版本號(如：git version 2.24.3)就表示安裝成功！
<br>
<br>
```
git --version
```
<br>

  * 輸入指令，確認是否安裝 Xcode Cli 
<br>

```
 xcode-select -p                                
 ```
<br>

Note: 有回傳檔案路徑如:/Applications/Xcode.app/Contents/Developer就代表有！若沒有，可輸入以下指令安裝
<br>
<br>

```
xcode-select --install
```
<br>

  * 輸入指令安裝 nvm 
<br>
<br>

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```
<br>

  * 安裝後，務必重新啟動terminal，並輸入以下指令
<br>
<br>

```
command -v nvm
```
<br>

Note: 若下一行出現了："nvm" 就表示成功了！

<br>

  * 接連輸入下方指令，安裝與套用Node.js
<br>
<br>

```
nvm install 14.16.0
```
<br>

```
nvm use 14.16.0
```
<br>

------------------------------------------------------------------------------------------------------------------------
<br>

 ##  Windows使用者：
<br> 
    
  * 到<a href="https://git-scm.com/">此網站</a>，點擊"Download for Windows"下載與安裝，安裝過程只要依序按Next鍵，不需做額外設定。安裝完成後打開名為 "Git Bash" 的檔案。(接下來會需要在Git Bash中輸入許多指令，若想直接將指令貼入介面中，請使用shift + insert鍵！)
<br>

  * 到<a href="https://github.com/coreybutler/nvm-windows/releases"> nvm-windows</a> ，往下滑到 Assets列表，找到「nvm-setup.exe」，將它下載並執行。
<br>

    Note: 請注意「nvm-setup.exe」檔案存放的路徑中，不可以有空白或中文。例如C:\Users\使用者 (也就是C槽的Users資料夾中的「使用者」資料夾)或是C:\Users\my file(C槽中的「my file」資料夾)，都可能導致執行錯誤。因此若C槽的使用者名稱為中文或含空白，建議將nvm設定檔存到其他地方。
<br>

  * 先關閉再重新開啟Git Bash，輸入以下指令，若有出現版本號(如：1.1.7)，即表示安裝成功！
<br>
<br>

```
nvm version
```
<br>

  * 接連輸入以下指令，安裝與套用Node.js
<br>
<br>

```
nvm install 14.16.0
```
<br>

```
nvm use 14.16.0
```
<br>

若出現錯誤，有可能是權限問題，試著用管理員身分開啟Git Bash，再重新安裝一次！

<br>


> ## 下載專案 
<br>

  * 接連在terminal或git bash輸入下列指令：

<br>

```
git clone https://github.com/Ansticefish/simple-twitter-front-end.git
```
<br>


```
cd simple-twitter-front-end
```
<br>

```
npm install
```
<br>

> ## 啟動專案
<br>

  * 輸入以下指令啟動專案：

<br>

```
npm run serve
```
<br>

此時，程式會花一點時間啟動，等啟動完畢會出現一段話，如：
<br>
<br>

```
App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.1.105:8080/
```
<br>

只要將任何一段網址貼到瀏覽器中(例如Chrome)，就可以看到Alphitter的內容了！