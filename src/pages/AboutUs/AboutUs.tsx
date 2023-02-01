import React from 'react';
import { Location } from '../../components/Location';

const AboutUs: React.FunctionComponent = () => (
  <div className="container">
    <Location />
    <section className="about-us">
      <div className="about-us__info">
        <h3 className="about-us__title">Про нас</h3>
        <p>
          Інтернет магазин WINUM був створений як продовження торгової марки WINUM -
          найбільшого гіпермаркету, а також ексклюзивного імпортера вин і алкогольних напоїв.
          <br />
          Нашою основною метою є допомога клієнтам у виборі якісних продуктів. Для вашої зручності
          і спрощення вибору ідеального поєднання їжі і
          вина до столу, ми створили інтернет-помічника
          - «Гастросомельє», який доступний для Вас цілодобово .
          Ми прагнемо створити абсолютно новий формат магазину,
          не забуваючи про якість. А наш слоган - «пристрасть
          до досконалості» говорить сам за себе, відображаючи
          всю нашу філософію і прагнення бути кращими на ринку України.
        </p>

        <h3 className="about-us__title">Наші цінності</h3>

        <div className="about-us__puritys">
          <div className="about-us__purity">
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.5 18C22.5 18 24 18 24 16.5C24 15 22.5 10.5 16.5 10.5C10.5 10.5 9 15 9 16.5C9 18 10.5 18 10.5 18H22.5ZM10.533 16.5C10.5219 16.4985 10.5109 16.4965 10.5 16.494C10.5015 16.098 10.7505 14.949 11.64 13.914C12.468 12.9435 13.923 12 16.5 12C19.0755 12 20.5305 12.945 21.36 13.914C22.2495 14.949 22.497 16.0995 22.5 16.494L22.488 16.497C22.481 16.4982 22.474 16.4992 22.467 16.5H10.533ZM16.5 7.5C17.2957 7.5 18.0587 7.18393 18.6213 6.62132C19.1839 6.05871 19.5 5.29565 19.5 4.5C19.5 3.70435 19.1839 2.94129 18.6213 2.37868C18.0587 1.81607 17.2957 1.5 16.5 1.5C15.7044 1.5 14.9413 1.81607 14.3787 2.37868C13.8161 2.94129 13.5 3.70435 13.5 4.5C13.5 5.29565 13.8161 6.05871 14.3787 6.62132C14.9413 7.18393 15.7044 7.5 16.5 7.5ZM21 4.5C21 5.09095 20.8836 5.67611 20.6575 6.22208C20.4313 6.76804 20.0998 7.26412 19.682 7.68198C19.2641 8.09984 18.768 8.43131 18.2221 8.65746C17.6761 8.88361 17.0909 9 16.5 9C15.9091 9 15.3239 8.88361 14.7779 8.65746C14.232 8.43131 13.7359 8.09984 13.318 7.68198C12.9002 7.26412 12.5687 6.76804 12.3425 6.22208C12.1164 5.67611 12 5.09095 12 4.5C12 3.30653 12.4741 2.16193 13.318 1.31802C14.1619 0.474106 15.3065 0 16.5 0C17.6935 0 18.8381 0.474106 19.682 1.31802C20.5259 2.16193 21 3.30653 21 4.5ZM10.404 10.92C9.80397 10.7311 9.18545 10.6069 8.559 10.5495C8.207 10.516 7.85359 10.4995 7.5 10.5C1.5 10.5 0 15 0 16.5C0 17.5005 0.4995 18 1.5 18H7.824C7.60163 17.5317 7.49074 17.0183 7.5 16.5C7.5 14.985 8.0655 13.437 9.135 12.144C9.4995 11.703 9.924 11.2905 10.404 10.92ZM7.38 12C6.49223 13.3339 6.01266 14.8977 6 16.5H1.5C1.5 16.11 1.746 14.955 2.64 13.914C3.4575 12.96 4.878 12.03 7.38 12.0015V12ZM2.25 5.25C2.25 4.05653 2.72411 2.91193 3.56802 2.06802C4.41193 1.22411 5.55653 0.75 6.75 0.75C7.94347 0.75 9.08807 1.22411 9.93198 2.06802C10.7759 2.91193 11.25 4.05653 11.25 5.25C11.25 6.44347 10.7759 7.58807 9.93198 8.43198C9.08807 9.27589 7.94347 9.75 6.75 9.75C5.55653 9.75 4.41193 9.27589 3.56802 8.43198C2.72411 7.58807 2.25 6.44347 2.25 5.25ZM6.75 2.25C5.95435 2.25 5.19129 2.56607 4.62868 3.12868C4.06607 3.69129 3.75 4.45435 3.75 5.25C3.75 6.04565 4.06607 6.80871 4.62868 7.37132C5.19129 7.93393 5.95435 8.25 6.75 8.25C7.54565 8.25 8.30871 7.93393 8.87132 7.37132C9.43393 6.80871 9.75 6.04565 9.75 5.25C9.75 4.45435 9.43393 3.69129 8.87132 3.12868C8.30871 2.56607 7.54565 2.25 6.75 2.25Z" fill="#A59696" />
            </svg>

            <h4 className="about-us__purity__title">Люди</h4>

            <p className="about-us__purity__info">
              Люди – наш пріоритет №1. Winum за чесні відносини у колективі,
              максимальну допомогу, взаємовиручку та наставництво заради спільного
              досягнення загальних цілей.
            </p>
          </div>
          <div className="about-us__purity">
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1 15.55L10 15.65L9.89 15.55C5.14 11.24 2 8.39 2 5.5C2 3.5 3.5 2 5.5 2C7.04 2 8.54 3 9.07 4.36H10.93C11.46 3 12.96 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.39 14.86 11.24 10.1 15.55ZM14.5 0C12.76 0 11.09 0.81 10 2.08C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.41 0 5.5C0 9.27 3.4 12.36 8.55 17.03L10 18.35L11.45 17.03C16.6 12.36 20 9.27 20 5.5C20 2.41 17.58 0 14.5 0Z" fill="#A59696" />
            </svg>

            <h4 className="about-us__purity__title">Бренди які люблять</h4>

            <p className="about-us__purity__info">
              Ми вклали багато зусиль у створення високоякісної продукції
              за справедливою ціною та пишаємось довірою партнерів та споживачів до наших брендів.
            </p>
          </div>
          <div className="about-us__purity">
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0V1.5H18.9395L12.5 7.9395L9.28025 4.71975C9.1396 4.57915 8.94887 4.50016 8.75 4.50016C8.55113 4.50016 8.3604 4.57915 8.21975 4.71975L0.5 12.4395L1.5605 13.5L8.75 6.3105L11.9697 9.53025C12.1104 9.67085 12.3011 9.74984 12.5 9.74984C12.6989 9.74984 12.8896 9.67085 13.0303 9.53025L20 2.5605V7.5H21.5V0H14Z" fill="#A59696" />
            </svg>

            <h4 className="about-us__purity__title">Самореалізація</h4>

            <p className="about-us__purity__info">
              Ми поважаємо особистість кожного співробітника. У
              компанії представлені всі умови для розширення меж власних
              можливостей, реалізації талантів.
            </p>
          </div>
          <div className="about-us__purity">
            <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.37496 11.3691C12.2383 11.3691 14.5595 9.04786 14.5595 6.18453C14.5595 3.32119 12.2383 1 9.37496 1C6.51162 1 4.19043 3.32119 4.19043 6.18453C4.19043 9.04786 6.51162 11.3691 9.37496 11.3691Z" stroke="#A59696" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 19.3453C1 15.3572 4.19048 11.3691 9.375 11.3691C14.5595 11.3691 17.75 15.3572 17.75 19.3453" stroke="#A59696" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
              <mask id="path-3-inside-1_0_1" fill="white">
                <path d="M8.97611 11.6353L6.31738 15.8892L8.97611 20.1432L11.6348 15.8892M7.38088 15.8892L8.97611 13.2305L10.5714 15.8892L8.97611 18.548" />
              </mask>
              <path d="M8.97611 11.6353L6.31738 15.8892L8.97611 20.1432L11.6348 15.8892M7.38088 15.8892L8.97611 13.2305L10.5714 15.8892L8.97611 18.548" fill="#713543" />
              <path d="M6.31738 15.8892L5.46938 15.3592L5.13814 15.8892L5.46938 16.4192L6.31738 15.8892ZM8.97611 20.1432L8.12812 20.6732L8.97611 22.03L9.82411 20.6732L8.97611 20.1432ZM8.97611 13.2305L9.83361 12.716L8.97611 11.2868L8.11862 12.716L8.97611 13.2305ZM10.5714 15.8892L11.4288 16.4037L11.7375 15.8892L11.4288 15.3747L10.5714 15.8892ZM8.12812 11.1053L5.46938 15.3592L7.16538 16.4192L9.82411 12.1653L8.12812 11.1053ZM5.46938 16.4192L8.12812 20.6732L9.82411 19.6132L7.16538 15.3592L5.46938 16.4192ZM9.82411 20.6732L12.4828 16.4192L10.7868 15.3592L8.12812 19.6132L9.82411 20.6732ZM8.23837 16.4037L9.83361 13.745L8.11862 12.716L6.52338 15.3747L8.23837 16.4037ZM8.11862 13.745L9.71386 16.4037L11.4288 15.3747L9.83361 12.716L8.11862 13.745ZM9.71386 15.3747L8.11862 18.0335L9.83361 19.0625L11.4288 16.4037L9.71386 15.3747Z" fill="#A59696" mask="url(#path-3-inside-1_0_1)" />
            </svg>

            <h4 className="about-us__purity__title">Чесність та етичність бізнесу</h4>

            <p className="about-us__purity__info">
              Ми цінуємо репутацію компанії, яка заснована на довгострокових чесних
              відносинах з партнерами та споживачами, тому сумлінно
              виконуємо свої
              {' зобов\'язання'}
              .
            </p>
          </div>
          <div className="about-us__purity">
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0V1.5H18.9395L12.5 7.9395L9.28025 4.71975C9.1396 4.57915 8.94887 4.50016 8.75 4.50016C8.55113 4.50016 8.3604 4.57915 8.21975 4.71975L0.5 12.4395L1.5605 13.5L8.75 6.3105L11.9697 9.53025C12.1104 9.67085 12.3011 9.74984 12.5 9.74984C12.6989 9.74984 12.8896 9.67085 13.0303 9.53025L20 2.5605V7.5H21.5V0H14Z" fill="#A59696" />
            </svg>

            <h4 className="about-us__purity__title">Глобальність</h4>

            <p className="about-us__purity__info">
              Наша продукція представлена на 5 континентах. І
              ми продовжуємо будувати амбітні плани
              з глобалізації бізнесу та успішно реалізуємо їх.
            </p>
          </div>
          <div className="about-us__purity">
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6H12.388L13.511 2.633C13.713 2.025 13.611 1.351 13.236 0.831C12.861 0.311 12.253 0 11.612 0H10C9.703 0 9.422 0.132 9.231 0.36L4.531 6H2C0.897 6 0 6.897 0 8V17C0 18.103 0.897 19 2 19H15.307C15.7139 18.9986 16.1108 18.8738 16.4452 18.6421C16.7797 18.4103 17.0359 18.0825 17.18 17.702L19.937 10.351C19.9789 10.2387 20.0002 10.1198 20 10V8C20 6.897 19.103 6 18 6ZM2 8H4V17H2V8ZM18 9.819L15.307 17H6V7.362L10.468 2H11.614L10.052 6.683C10.0013 6.83331 9.98715 6.99355 10.0107 7.15043C10.0343 7.3073 10.095 7.45629 10.1877 7.58504C10.2803 7.71379 10.4024 7.8186 10.5436 7.89076C10.6849 7.96293 10.8414 8.00037 11 8H18V9.819Z" fill="#A59696" />
            </svg>

            <h4 className="about-us__purity__title">Професіоналізм</h4>

            <p className="about-us__purity__info">
              Ми цінуємо справжніх експертів. Наші співробітники –
              справжні експерти, які продовжують розвиватися та навчатися у Winum.
            </p>
          </div>
        </div>

      </div>
      <div className="about-us__blur"></div>
      <div className="about-us__img">
        <img src="./img/aboutUsBG.svg" alt="123" />
      </div>
    </section>
  </div>
);

export default AboutUs;