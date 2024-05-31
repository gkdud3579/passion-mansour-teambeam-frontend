"use client";

import {
  BackBtnIcon,
  BoardSvg,
  SearchIcon,
  TableSvg,
} from "@/app/_components/Icons";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import "@/app/_styles/Board.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getPostTag, postAddPost } from "@/app/_api/board";

type TagType = {
  tagId: number;
  tagName: string;
  tagCategory: string;
  projectId: number;
};

type CellType = {
  key: string;
  value: string;
};

const Page = () => {
  const [title, setTitle] = useState<string>("");
  const [notice, setNotice] = useState<boolean>(false);
  const [inputContent, setInputContent] = useState<string>("");
  const [template, setTemplate] = useState<string>("text");
  const [tags, setTags] = useState<TagType[]>([]);
  const [query, setQuery] = useState<string>("");
  const [tagSelect, setTagSelect] = useState<TagType[]>([]);
  const [isTagsMenu, setIsTagsMenu] = useState<boolean>(false);
  const [cols, setCols] = useState<number>(3);
  const [rows, setRows] = useState<number>(2);
  const [cells, setCells] = useState<CellType[][]>([]);

  const params = useParams<{ projectId: string; boardId: string }>();

  useEffect(() => {
    const newCells: CellType[][] = [];
    for (let i = 0; i < rows; i++) {
      const rowCells: CellType[] = [];
      for (let j = 0; j < cols; j++) {
        rowCells.push({ key: `${i}_${j}`, value: "" });
      }
      newCells.push(rowCells);
    }
    setCells(newCells);

    const fetchTagData = async () => {
      try {
        const res = await getPostTag(`/team/${params.projectId}/tag`);
        console.log("res : ", res);

        setTags(res.data.tagResponses);
      } catch (err) {
        console.log("err  : ", err);
      }
    };

    fetchTagData();
  }, [params]);

  const filterTag: TagType[] = tags.filter((tag: TagType) => {
    return (
      tag.tagName
        ?.toLocaleLowerCase()
        ?.includes(query?.toLocaleLowerCase()?.trim()) &&
      !tagSelect.map((_tag) => _tag.tagName).includes(tag.tagName)
    );
  });

  const router = useRouter();

  const handleNotice = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNotice(e.target.checked);
  }, []);

  const handleTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const onContent = useCallback((content: string) => {
    setInputContent(content);
  }, []);

  const onTemplate = useCallback((type: string) => {
    setTemplate(type);
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const handleColumnAdd = useCallback(() => {
    setCols((prev) => prev + 1);
    setCells((prevCells) => {
      return prevCells.map((row, rowIndex) => [
        ...row,
        { key: `${rowIndex}_${cols}`, value: "" },
      ]);
    });
  }, [cols]);

  const handleRowAdd = useCallback(() => {
    setRows((prev) => prev + 1);
    setCells((prevCells) => [
      ...prevCells,
      Array.from({ length: cols }, (_, colIndex) => ({
        key: `${rows}_${colIndex}`,
        value: "",
      })),
    ]);
  }, [rows, cols]);

  const handleCellValue = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      rowIndex: number,
      cell: CellType
    ) => {
      const newCells = cells.map((row, i) =>
        i === rowIndex
          ? row.map((c) =>
              c.key === cell.key ? { ...c, value: e.target.value } : c
            )
          : row
      );
      setCells(newCells);
    },
    [cells]
  );

  const onSubmit = useCallback(async () => {
    const data = {
      title,
      content: template !== "text" ? cells : inputContent,
      postType: template,
      notice,
      postTagIds: tagSelect.map((tag) => tag.tagId),
    };

    console.log(data);

    try {
      const res = await postAddPost(`/team/${params.projectId}/1/`, data);
      console.log("res : ", res);

      alert("게시글 생성이 완료되었습니다.");
      router.push(`/teamPage/${params.projectId}/teamBoard`);
    } catch (err) {
      console.log("err  : ", err);
    }
  }, [notice, title, template, inputContent, tagSelect, cells, router, params]);

  return (
    <div>
      <form action={onSubmit}>
        <div className='top-board-view write'>
          <div className='topBoardLeft'>
            <button
              type='button'
              className='back-btn'
              onClick={() => router.back()}
            >
              <BackBtnIcon size={13} />
            </button>

            <h2>글쓰기</h2>
          </div>

          <button type='submit' className='writeBtn'>
            등록
          </button>
        </div>

        <div className='templateWrap'>
          <h4>템플릿 선택</h4>
          <div className='templateSelect'>
            <button
              type='button'
              className={`${template === "text" ? "active" : ""}`}
              onClick={() => onTemplate("text")}
            >
              <BoardSvg size={104} />
              <span>게시글</span>
            </button>
            <button
              type='button'
              className={`${template === "table" ? "active" : ""}`}
              onClick={() => onTemplate("table")}
            >
              <TableSvg size={104} />
              <span>표</span>
            </button>
          </div>
        </div>

        <div className='boardWirteInputs'>
          <div className='noticeBox'>
            <input
              type='checkbox'
              id='notice'
              checked={notice}
              onChange={handleNotice}
            />
            <label htmlFor='notice'>공지등록</label>
          </div>

          <input
            type='text'
            className='inputText'
            value={title}
            onChange={handleTitle}
            placeholder='제목'
          />

          <div className='tagWrap'>
            <div className='tagSearchBox'>
              <SearchIcon size={24} />
              <input
                type='text'
                className='inputText tagSearchInput'
                value={query}
                onChange={(e) => setQuery(e.target.value.trimStart())}
                placeholder='태그 검색'
                onFocus={() => setIsTagsMenu(true)}
                onBlur={() => setIsTagsMenu(false)}
              />
            </div>

            {tagSelect?.length ? (
              <div className='selectTagWrap'>
                {tagSelect.map((tag) => (
                  <div key={tag.tagId} className='selectTagItem'>
                    {tag.tagName}
                    <span
                      className='tagClose'
                      onClick={() =>
                        setTagSelect(
                          tagSelect.filter((_tag) => {
                            return _tag.tagName !== tag.tagName;
                          })
                        )
                      }
                    >
                      X
                    </span>
                  </div>
                ))}
              </div>
            ) : null}

            {isTagsMenu ? (
              <div className='tagsMenuWrap'>
                <ul>
                  {filterTag?.length ? (
                    filterTag.map((tag, idx) => (
                      <li
                        key={tag.tagId}
                        className='tagItem'
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setIsTagsMenu(true);
                          setTagSelect((prev) => [...prev, tag]);
                        }}
                      >
                        {tag.tagName}
                      </li>
                    ))
                  ) : (
                    <li className='noItem'>검색하신 태그가 없습니다</li>
                  )}
                </ul>
              </div>
            ) : null}
          </div>

          {template === "text" ? (
            <div className='editorBox'>
              <ReactQuill
                modules={modules}
                value={inputContent}
                onChange={onContent}
                className='quillEditor'
              />
            </div>
          ) : null}

          {template === "table" ? (
            <>
              <div className='tableWrap'>
                <table className='writerTable'>
                  <thead>
                    {cells.slice(0, 1).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell) => (
                          <th key={cell.key}>
                            <input
                              type='text'
                              value={cell.value}
                              onChange={(e) =>
                                handleCellValue(e, rowIndex, cell)
                              }
                            />
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {cells.slice(1).map((row, rowIndex) => (
                      <tr key={rowIndex + 1}>
                        {row.map((cell) => (
                          <td key={cell.key}>
                            <input
                              type='text'
                              value={cell.value}
                              onChange={(e) =>
                                handleCellValue(e, rowIndex + 1, cell)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type='button'
                  className='colAddBtn'
                  onClick={handleColumnAdd}
                >
                  열 추가
                </button>
              </div>

              <button
                type='button'
                className='rowAddBtn'
                onClick={handleRowAdd}
              >
                행 추가
              </button>
            </>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Page;