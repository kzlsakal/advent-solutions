Code.compile_file(Path.join([__ENV__.file], ["../../../utils/utils.exs"]))

defmodule Challenge do
  @moduledoc false

  def first_result(input), do: input |> Enum.reduce([0, 0], &exec_q1(&1, &2)) |> depth_x_pos()
  def second_result(input), do: input |> Enum.reduce([0, 0, 0], &exec_q2(&1, &2)) |> depth_x_pos()

  defp exec_q1("forward " <> x, [pos, depth]), do: [pos + int(x), depth]
  defp exec_q1("down " <> x, [pos, depth]), do: [pos, depth + int(x)]
  defp exec_q1("up " <> x, [pos, depth]), do: [pos, depth - int(x)]

  defp exec_q2("forward " <> x, [pos, depth, aim]), do: [pos + int(x), depth + aim * int(x), aim]
  defp exec_q2("down " <> x, [pos, depth, aim]), do: [pos, depth, aim + int(x)]
  defp exec_q2("up " <> x, [pos, depth, aim]), do: [pos, depth, aim - int(x)]

  defp int(str), do: String.to_integer(str)
  defp depth_x_pos([x, y]), do: x * y
  defp depth_x_pos([x, y, _]), do: x * y
end

Utils.run(&Challenge.first_result/1, __ENV__.file, "Q1")
Utils.run(&Challenge.second_result/1, __ENV__.file, "Q2")
