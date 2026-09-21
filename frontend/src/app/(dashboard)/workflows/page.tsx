import { TaskExecutionView } from "@/components/TaskExecutionView";

export default function WorkflowsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
       <h1 className="text-3xl font-semibold mb-2 text-white">Live Workflow Trace</h1>
      <p className="text-slate-400 mb-8 max-w-2xl">
        Monitor real-time agent coordination, step-by-step logic, and fact-checking processes.
      </p>

      <TaskExecutionView />
    </div>
  );
}
