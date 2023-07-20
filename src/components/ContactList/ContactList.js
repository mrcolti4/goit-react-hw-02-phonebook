import style from './ContactList.module.css';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className={style.contact__list}>
      {contacts.map(({ name, number, id }) => {
        return (
          <li key={id} className={style.contact__item}>
            <span className="name">{name}:</span>
            <span className="phone">{number}</span>
            <button type="button" onClick={() => onDelete(id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
