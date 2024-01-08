export class CardWidget {
    constructor(parentEl) {
      this.parentEl = parentEl;
      this.ClickonsubmitBtn = this.ClickonsubmitBtn.bind(this);
      this.input = null;
      this.submitBtn = null;
    }
  
    validateCreditCard() {
      const cardTypes = [
        { type: 'mastercard', pattern: /^(5[1-5]\d{14})$/ },
        { type: 'visa', pattern: /^(4\d{15}|4\d{12})$/ },
        { type: 'mir', pattern: /^2[0-9]{15}$/ }
      ];
  
      const isValidLuhn = (num) => {
        let checksum = +num[num.length - 1];
        let total = 0;
  
        for (let i = num.length - 2; i >= 0; i--) {
          let sum = 0;
          let digit = +num[i];
          if (i % 2 === 0) {
            digit *= 2;
          }
  
          sum = Math.floor(digit / 10) + (digit % 10);
          total += sum;
        }
  
        return (10 - total % 10) === checksum;
      };
  
      const input = this.parentEl.querySelector('#card_number');
      const number = input.value.replace(/\s/g, ''); // Удаляем пробелы из введенного номера
  
      const matchingCardType = cardTypes.find(card => card.pattern.test(number));
  
      if (matchingCardType && isValidLuhn(number)) {
        return { cardType: matchingCardType.type };
      } else {
        return {};
      }
    }
  
    setClass(result) {
        const cardItems = document.querySelectorAll('.card');
    
        if (!cardItems || cardItems.length === 0) {
            console.error("Elements not found: .card");
            return;
        }
    
        if (result.cardType) {
            const specificCard = document.querySelector(`.cards .${result.cardType}`);
    
            if (specificCard) {
                specificCard.classList.add('valid-card');
                console.log("валидация прошла на " + result.cardType);
            } else {
                console.error("Element not found: .cards ." + result.cardType);
            }
        }
    }
    
  
    static get markup() {
      return `
        <form id="form" class="form-inline">
          <div class="form-group">
            <input class="form-control col-md-6" id="card_number" name="card_number" type="text" placeholder="Credit card number">
            <button id="submitform" class="btn btn-success">Click to Validate</button>
          </div>
        </form>
      `;
    }
  
    bindToDOM() {
      this.parentEl.innerHTML = CardWidget.markup;
      this.input = this.parentEl.querySelector("#card_number");
      this.submitBtn = this.parentEl.querySelector("#submitform");
  
      this.submitBtn.addEventListener('click', this.ClickonsubmitBtn);
    }
  
    ClickonsubmitBtn(e) {
        e.preventDefault();
        const validationResult = this.validateCreditCard();
    
        const cardItems = document.querySelectorAll('.card');
        cardItems.forEach(card => {
            card.classList.remove('valid-card');
        });
    
        this.setClass(validationResult);
    }
    
  }





  
  




  
  

  
  
  
  

