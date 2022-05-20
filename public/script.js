const emplosDOM = document.querySelector(".emplos");
const formDOM = document.querySelector(".emplo-form");
const emploInputDOM = document.querySelector(".emplo-input");
const formAlertDOM = document.querySelector(".form-alert");


// /api/v1/tasksからタスクを読み込む
const showTasks = async () => {
    try {
        //自作のapiを叩く
        const { data: emplos } = await axios.get("/api/v1/tasks");

        //タスクが一つもないとき
        if(emplos.length < 1) {
            emplosDOM.innerHTML = `<h5 class="empty-list">登録されている社員がいません</h5> `
            return;
        }

        //タスクを出力
        const allEmplos = emplos.map((emplo) => {
            const { attend, _id, name} = emplo;

            return `
            <div class="single-emplo ${attend && "emplo-attend"}">
                <h5>
                    <span><i class="fas fa-check-circle"></i></span>${name}
                </h5>
                <div class="emplo-links">
                    <!--編集リンク-->
                    <a href="edit.html?id=${_id}" class="edit-link">
                        <i class="fas fa-user-edit"></i>
                    </a>
                    <!--ゴミ箱リンク-->
                    <button type="button" class="delete-btn" data-id="${_id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            `;
        })
        .join("");
        emplosDOM.innerHTML = allEmplos;

    } catch (err) {
        console.log(err);
    }
};

showTasks();

//タスクを新規作成する
formDOM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = emploInputDOM.value;

    try {
        await axios.post("/api/v1/tasks", {name: name});
        showTasks()
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "登録しました";
        formAlertDOM.classList.add("text-success");
    } catch (err) {
        console.log(err);
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "無効です。もう一度やり直してください。";
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});

//タスクを削除する
emplosDOM.addEventListener("click", async(event) => {
    const element = event.target;
    if(element.parentElement.classList.contains("delete-btn")){
        const id = element.parentElement.dataset.id;

        try {
            await axios.delete(`/api/v1/tasks/${id}`)
            showTasks();
        } catch (err) {
            console.log(err);
        }
    }
});
