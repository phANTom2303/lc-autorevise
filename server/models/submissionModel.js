const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    submission_id: {
        type: String,
        required: true
    },
    status_code: Number,
    lang: String,
    run_success: Boolean,
    status_runtime: String,
    memory: Number,
    display_runtime: String,
    question_id: String,
    elapsed_time: Number,
    compare_result: String,
    code_output: String,
    std_output: String,
    last_testcase: String,
    expected_output: String,
    task_finish_time: Number,
    task_name: String,
    finished: Boolean,
    total_correct: Number,
    total_testcases: Number,
    runtime_percentile: Number,
    status_memory: String,
    memory_percentile: Number,
    pretty_lang: String,
    status_msg: String,
    state: String,
    compile_error: String,
    full_compile_error: String,
    input_formatted: String,
    input: String
}, {
    timestamps: true
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;