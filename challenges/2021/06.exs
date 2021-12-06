Code.compile_file(Path.join([__ENV__.file], ["../../../utils/utils.exs"]))

defmodule Challenge do
  @moduledoc false

  def first_result(input), do: breed(input, 80)

  def second_result(input), do: breed(input, 256)

  defp breed(input, days) do
    state =
      input
      |> Enum.at(0)
      |> String.split(",", trim: true)
      |> Enum.map(&String.to_integer/1)
      |> Enum.reduce(List.duplicate(0, 9), fn val, acc ->
        List.update_at(acc, val - 1, &(&1 + 1))
      end)

    Enum.reduce(1..(days - 1), state, fn _, [q, w, e, r, t, y, u, i, o] ->
      [w, e, r, t, y, u, i + q, o, q]
    end)
    |> Enum.sum()
  end
end

Utils.run(&Challenge.first_result/1, __ENV__.file, "Q1")
Utils.run(&Challenge.second_result/1, __ENV__.file, "Q2")
