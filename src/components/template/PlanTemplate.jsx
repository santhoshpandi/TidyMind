import React, { useState, useRef } from "react";
import { MdRefresh } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { toPng } from 'html-to-image';
import { usePlan } from "../../contexts/PlanContext";

export default function PlanTemplate() {

  const { schedule, setSchedule, fetchPlan, initialSchedule } = usePlan()


  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editTime, setEditTime] = useState("");
  const plannerRef = useRef();

  const handleCheck = (idx) => {
    setSchedule(schedule =>
      schedule.map((item, i) =>
        i === idx ? { ...item, done: !item.done } : item
      )
    );
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditValue(schedule[idx].task);
    setEditTime(schedule[idx].time);
  };

  const handleEditSave = (idx) => {
    setSchedule(schedule =>
      schedule.map((item, i) =>
        i === idx ? { ...item, task: editValue, time: editTime } : item
      )
    );
    setEditIdx(null);
    setEditValue("");
    setEditTime("");
  };

  const handleDelete = (idx) => {
    setSchedule(schedule => schedule.filter((_, i) => i !== idx));
    if (editIdx === idx) {
      setEditIdx(null);
      setEditValue("");
      setEditTime("");
    }
  };

  // Refresh handler
  const handleRefresh = () => {
    fetchPlan()
    setSchedule(initialSchedule);
    setEditIdx(null);
    setEditValue("");
  };

  // Download handler
  const handleDownload = async () => {
    const node = plannerRef.current;
    if (!node) return;

    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = 'planner.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
    }
  };


  return (
    <div className=" md:w-[80%] w-[95%] xl:w-[60%] flex items-center justify-center md:p-6">
      <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-orange-200 p-10 w-full">

        {/* Planner Content */}
        <div ref={plannerRef}>
          <h2 className="text-3xl font-semibold text-orange-600 mb-6 text-center tracking-tight flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <span className="text-center md:text-left">
              🌅 Your Pleasant Day Planner
            </span>

            {/* Top Buttons */}
            <div className="flex justify-center gap-4">
              {/* <button
                className="rounded text-orange-700 text-lg transition"
              >
                <FaFire />
              </button> */}
              <button
                onClick={handleRefresh}
                className="rounded text-orange-700 text-xl font-extrabold transition"
              >
                <MdRefresh />
              </button>
              <button
                onClick={handleDownload}
                className=" rounded text-orange-700 text-lg font-semibold hover:text-orange-500 transition"
              >
                <FaDownload />
              </button>
            </div>
          </h2>

          <ul className="divide-y max-w-full  divide-orange-100">
            {schedule.map((item, idx) => (
              <li
                key={idx}
                className="py-4 max-w-full grid sm:grid-cols-1 md:grid-cols-12  items-center gap-2 group"
              >
                {/* Time */}
                <div className="md:col-span-4 sm:col-span-1 items-center grid grid-cols-12 whitespace-nowrap pr-4 min-w-[180px] ">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleCheck(idx)}
                    className={`appearance-none h-5 w-5 border-2 rounded-sm mr-2
                                bg-white border-orange-500 transition-all relative
                                checked:bg-orange-500 checked:border-orange-500
                                focus:outline-none focus:ring-1 focus:ring-orange-300
                                after:content-[''] checked:after:content-['✔']
                                checked:after:text-white checked:after:text-sm
                                checked:after:absolute checked:after:top-0.5
                                checked:after:left-[3px] checked:after:font-bold
                                checked:after:leading-none col-span-2`}
                    style={{ fontSize: '12px' }}
                  />
                  {editIdx === idx ? (
                    <input
                      type="text"
                      value={editTime}
                      onChange={e => setEditTime(e.target.value)}
                      className="font-mono outline-none focus:border-orange-800 transition-colors duration-150 col-span-10 text-orange-500 text-base leading-snug mr-3 px-2 py-1 border border-orange-300 rounded bg-orange-50 w-full"
                    />
                  ) : (
                    <span className="font-mono col-span-10 text-orange-500 text-base leading-snug mr-3">{item.time}</span>
                  )}
                </div>

                {/* Task/Input */}
                <div className="md:col-span-5 sm:col-span-1  flex items-center min-w-0">
                  {editIdx === idx ? (
                    <input
                      type="text"
                      autoFocus
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      className="px-2 outline-none py-1 h-8 focus:border-orange-800 transition-colors duration-150  border border-orange-300 text-base leading-snug rounded bg-orange-50 text-orange-900 font-light w-full truncate"
                      style={{ minWidth: 0 }}
                    />
                  ) : (
                    <span
                      className={`px-2 py-1 h-8 leading-snug text-orange-900 text-base md:text-lg font-light transition-all truncate w-full block ${item.done ? "line-through opacity-60" : ""}`}
                      title={item.task}
                      style={{ minWidth: 0, display: "block" }}
                    >
                      {item.task}
                    </span>
                  )}

                </div>
                {/* Buttons */}
                <div className="md:col-span-3  sm:col-span-1 flex gap-2 justify-end">
                  {editIdx === idx ? (
                    <button
                      onClick={() => handleEditSave(idx)}
                      className="px-3 py-1 rounded bg-orange-400 text-white text-xs font-semibold shadow border border-orange-500 hover:bg-orange-500 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(idx)}
                      className="px-3 py-1 rounded bg-[#FFFAF8] text-[#F54A00] text-xs font-semibold shadow border border-orange-500 hover:bg-[#edddd3] transition"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(idx)}
                    className="px-3 py-1 rounded bg-[#F54A00] text-white text-xs font-semibold shadow hover:bg-[#cc4b14] transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-center text-orange-700 text-sm font-light">
            Remember to pause, breathe, and enjoy each moment. <br />
            <span className="italic">TidyMind wishes you a wonderful day!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

