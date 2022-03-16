export function handleEdit(
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
     setValue: any,
      title: string, 
      message: string, 
      completed: boolean) {
    setIsEditing((prevState) => !prevState);
    setValue('title', title);
    setValue('message', message);
    setValue('completed', completed);
}