import Button from "../../UI/auth-button/Button";
import ErrorMessage from "../../form/ErrorMessage";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt, faPenToSquare, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useHttp } from "../../../hooks/useHttp";
import { useOnSubmit, useFormErrors, useHandles, useClearAllErrors } from "./hooks/TodoItem.hooks";
import { useTodoContext } from "../../../context/todo/TodoContext";
import { FormData } from '../../../interfaces/Todo';
import { handleEdit } from "./TodoItem.functions";
import "./TodoItem.css";

interface Props {
  title: string;
  message: string;
  id: string;
  completed: boolean;
  fetchTodos: (option: string) => void;
}

function TodoItem({ title, message, completed, id, fetchTodos }: Props): JSX.Element {
  const { register, handleSubmit, setValue, clearErrors: clearFormErrors, formState: { errors } } = useForm<FormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "all",
  });
  const { isLoading: httpIsLoading, error: httpError, setError, customFetch } = useHttp();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { option } = useTodoContext();
  const onSubmit = useOnSubmit(customFetch, fetchTodos.bind(null, option), setError, setIsEditing, id);
  const { titleErrors, messageErrors } = useFormErrors(errors);
  const clearAllErrors = useClearAllErrors(setError, clearFormErrors);
  const { handleClick, handleUpdate } = useHandles(id, fetchTodos.bind(null, option));

  useEffect(() => {
    setIsEditing(false);
  }, [option]);

  return (
    <div className={[`task`, completed && "task-completed", isEditing ? "task-editing" : ""].join(" ")}>
      {!isEditing && (
        <>
          <h3 className="task__title">{title}</h3>
          <pre className="task__message">{message}</pre>
        </>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} onChange={clearAllErrors}>
          <div className="form__input-field">
            <input
              className={[
                "form__input",
                titleErrors.length ? "invalid" : "",
              ].join(" ")}
              {...register("title", {
                required: true,
                minLength: 3,
                maxLength: 64
              })}
              placeholder="Title"
            />
            {titleErrors.length > 0 &&
              titleErrors.map((errorMessage) => (
                <ErrorMessage key={errorMessage} message={errorMessage} />
              ))}
          </div>
          <div className="form__input-field">
            <textarea rows={5}
              className={[
                "form__input",
                "todo-input__message",
                messageErrors.length ? "invalid" : "",
              ].join(" ")}
              {...register("message", {
                required: true,
                minLength: 3,
                maxLength: 256
              })}
              placeholder="Message"
            />
            {messageErrors.length > 0 &&
              messageErrors.map((errorMessage) => (
                <ErrorMessage key={errorMessage} message={errorMessage} />
              ))}
          </div>
          <div className="form__input-field">
            <input
              {...register("completed")}
              className="form__input"
              type="checkbox"
              name="completed"
            />
          </div>
          {httpError && (
            <ErrorMessage key={httpError.message} message={httpError.message} />
          )}
          <Button className="form-todo-btn" type="submit">Confirm</Button>
        </form>
      )}
      <div className="task__actions">
        {completed && (
          <FontAwesomeIcon
            className="task-revert-btn task-btn"
            icon={faArrowRotateRight}
            onClick={handleUpdate}
          />
        )}
        {!completed && (
          <FontAwesomeIcon
            className="task-check-btn task-btn"
            icon={faCheck}
            onClick={handleUpdate}
          />
        )}
        <FontAwesomeIcon
          className="task-edit-btn task-btn"
          icon={faPenToSquare}
          onClick={() => handleEdit(setIsEditing, setValue, title, message, completed)}
        />
        <FontAwesomeIcon
          className="task-delete-btn task-btn"
          icon={faTrashAlt}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default TodoItem;
