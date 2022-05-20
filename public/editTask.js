const emploIDDOM = document.querySelector(".emplo-edit-id");
const emploNameDOM = document.querySelector(".emplo-edit-name");
const editFormDOM = document.querySelector(".single-emplo-form");
const formAlertDOM = document.querySelector(".form-alert");
const emploAttendDOM = document.querySelector(".emplo-edit-attend");

const params = window.location.search;
const id = new URLSearchParams(params).get("id");

console.log(id);

//特定の社員情報を取得する
const showTask = async () => {
    try {
        const {data: emplo} = await axios.get(`/api/v1/tasks/${id}`);
        const {_id, attend, name} = emplo; 
        emploIDDOM.textContent = _id;
        emploNameDOM.value = name;
        if(attend) {
            emploAttendDOM.checked = true;
        }
    } catch (err) {
        console.log(err);
    }
};

showTask();

//タスクの編集
editFormDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const emploName = emploNameDOM.value;
        emploAttend = emploAttendDOM.checked;
        const { data: emplo } = await axios.patch(`/api/v1/tasks/${id}`, {
            name: emploName,
            attend: emploAttend,
        });
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "更新完了";
        formAlertDOM.classList.add("text-success");
    } catch (err) {
        console.log(err);
    }
});