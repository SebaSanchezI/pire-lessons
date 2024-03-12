"use client";
import { Modal } from "@/components";
import { KeyboardEventHandler, useState } from "react";

export default function Home() {
  let listSaved = [];
  const arrSaved = localStorage.getItem("personList");
  if (arrSaved) {
    listSaved = JSON.parse(arrSaved);
  }
  const [countGroup, setCountGroup] = useState(2);
  const [personName, setPersonName] = useState<string>("");
  const [personList, setPersonList] = useState<string[]>(listSaved);
  const [error, setError] = useState<boolean>(false);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [groupsGenerated, setGroupsGenerated] = useState<string[][]>([]);

  const handleInputGroupChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const num = event.target.value;
    setCountGroup(+num);
  };
  const handlePersonNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const personName = event.target.value;
    setPersonName(personName);
  };
  const handleAddPerson = () => {
    if (!personName) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      setPersonList([...personList, personName]);
      localStorage.setItem(
        "personList",
        JSON.stringify([...personList, personName])
      );
      setPersonName("");
    }
  };

  const handleRemovePerson = (item: string) => {
    const listFiltered = personList.filter((name) => name !== item);
    setPersonList(listFiltered);
    localStorage.setItem("personList", JSON.stringify(listFiltered));
  };
  // no funciona
  const handleKeyDown = (e: KeyboardEventHandler<HTMLButtonElement>) => {
    if (e.arguments === 13) {
      handleAddPerson();
    }
  };

  const handleGenerateGroups = () => {
    const arrayCopy = [...personList];
    let groups: string[][] = Array.from({ length: countGroup }, () => []);
    while (arrayCopy.length > 0) {
      for (let i = 0; i < countGroup; i++) {
        const idxElement: number = Math.floor(Math.random() * arrayCopy.length);
        groups[i].push(arrayCopy.splice(idxElement, 1)[0]);
      }
    }
    groups = groups.map((group: string[]) => {
      return group.filter((el: string) => el);
    });
    setGroupsGenerated(groups);
  };

  const handleResetGroups = () => setGroupsGenerated([]);

  const handleSelectPerson = (groupNumber: number | undefined) => {
    let selected = "";
    if (groupNumber || groupNumber === 0) {
      const groupSelected = groupsGenerated[groupNumber];
      const indexRandom: number = Math.floor(
        Math.random() * groupSelected.length
      );
      selected = groupSelected[indexRandom];
    } else {
      const indexRandom: number = Math.floor(Math.random() * personList.length);
      selected = personList[indexRandom];
    }
    setSelectedPerson(selected);
    setModalOpen(true);
    selected = "";
  };

  return (
    <main className="flex flex-col min-h-screen p-4">
      <h1 className="text-2xl text-center">LAS PIRE CLASES</h1>
      <div className="flex min-h-screen items-start justify-between">
        <div className="flex flex-col items-start justify-between p-2 md:w-1/3 lg:w-1/4 ">
          <div className="flex flex-col items-start justify-between mb-2 w-full">
            <label htmlFor="groupNumber">Cantidad de grupos</label>
            <input
              className="dark:text-black p-1 w-full rounded"
              type="number"
              id="groupNumber"
              value={countGroup}
              onChange={handleInputGroupChange}
              min={2}
            />
          </div>
          <div className="flex items-start justify-between flex-col w-full">
            <div className="flex flex-col items-start mb-2 w-full">
              <label htmlFor="personList">Persona</label>
              <input
                className="dark:text-black p-1 w-full rounded"
                id="personName"
                value={personName}
                onChange={handlePersonNameChange}
                placeholder="Nombre de una persona"
              />
              {error && (
                <p className="bg-red-500 text-white font-bold mt-2 mb-2">
                  El campo nombre no puede estar vacio
                </p>
              )}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={handleAddPerson}
              onKeyDown={() => handleKeyDown}
            >
              Agregar
            </button>
          </div>
          <div className="mt-2 w-full">
            <h2 className="mb-2 w-full">{`LISTA (${personList.length}):`}</h2>
            <ul className="w-full">
              {personList.map((person) => (
                <li key={person}>
                  <div className="flex items-center justify-between capitalize bg-yellow-500 hover:bg-yellow-700 mb-2 px-2 py-1 w-full font-bold rounded">
                    <p>{person}</p>
                    <div onClick={() => handleRemovePerson(person)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col p-2 w-full h-max">
          <div className="flex flex-wrap gap-4 justify-evenly mb-2 w-full p-4 border-gray-400 border-b border-solid">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleGenerateGroups}
            >
              Generar grupos
            </button>
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleResetGroups}
            >
              Limpiar grupos
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleSelectPerson(undefined)}
            >
              Pasar al frente
            </button>
          </div>
          <div className="flex flex-wrap gap-4 items-start justify-evenly p-4">
            {groupsGenerated.length > 0 &&
              groupsGenerated.map((group, idx) => (
                <div
                  key={idx}
                  className="p-2 dark: bg-slate-500 h-max w-60 rounded"
                >
                  <p className="font-bold">GRUPO: {idx + 1}</p>
                  <ul className="p-2">
                    {group.map((el) => (
                      <li
                        key={el}
                        className="capitalize bg-yellow-500 hover:bg-yellow-700 mb-2 px-2 py-1 w-full font-bold rounded"
                      >
                        {el}
                      </li>
                    ))}
                  </ul>
                  <div className="p-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleSelectPerson(idx)}
                    >
                      Pasar al frente
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <h2>Quien debe pasar al frente es:</h2>
          <p className="dark:text-white text-4xl font-bold py-2">
            {selectedPerson.toUpperCase()}
          </p>
        </Modal>
      </div>
    </main>
  );
}
