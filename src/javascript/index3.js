class FormSubmit{
    constructor(settings){
        this.configuracoes = configuracoes;
        thia.form = document.querySelector(configuracoes.form);
        this.formButton = document.querySelector(configuracoes.button);
        if(this.form){
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }
    //Mensagens de sucesso e error
    displaySucess(){
        this.form.innerHTML = this.configuracoes.sucess;
    }

    displayError(){
        this.form.innerHTML = this.configuracoes.error;
    }

    getFormObject(){
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }
    //desabilitar botao
    onSubmission(event){
        event.preventDefault(); //funcao de nao mudar a url quando enviar o email
        event.target.disable = true;
        event.target.innerHTMLText = "Enviando...";
    }
    //Enviar formulário
    async EnviarForm(event){
        try{
            this.onSubmission(event);
        await fetch(this.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(this.getFormObject()),
        });
        this.displaySucess();
    }catch (error){
        this.displayError();
        throw new Error(error); //para o desenvolvedor inspencionar
    }
}

    init(){
        if(this.form) this.formButton.addEventListener("Click", this.sendForm);
        return this;
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]", 
    button: "[data-button]",
    sucess: "<h1 class='sucess'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Nao foi possivel enviar sua mensagem.</h1>"
});
formSubmit.init();