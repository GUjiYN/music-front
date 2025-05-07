/**
 * 基础响应类型
 *
 * 此类型用于定义API响应的标准化结构，包含输出信息、错误代码、提示消息以及可选的错误详情和数据内容。
 *
 * @template T 数据类型，表示响应中携带的具体数据结构，可根据实际需求替换为任意类型。
 *
 * @property {string} output - 输出信息，通常为响应的标识或处理结果的简短描述。
 * @property {number} code - 错误代码，0通常表示成功，非零值表示不同类型的错误。
 * @property {string} message - 提示消息，对错误代码的详细说明或成功时的确认信息。
 * @property {string} [error_message] - 可选，错误详情信息，当请求处理中发生错误时提供更详细的错误描述。
 * @property {T} [data] - 可选，响应数据，成功时返回的具体业务数据，类型由泛型T决定。
 */
export type BaseResponse<T> = {
    output: string;
    code: number;
    message: string;
    error_message?: string;
    data?: T;
}
