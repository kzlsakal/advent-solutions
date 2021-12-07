Code.compile_file(Path.join([__ENV__.file], ["../../../utils/utils.exs"]))

defmodule Challenge do
  @moduledoc false

  def first_result([input]), do: get_min_fuel(input, & &1)

  def second_result([input]), do: get_min_fuel(input, &(&1 * (&1 + 1) / 2))

  defp get_min_fuel(input, calculate_distance) do
    nums =
      input
      |> String.split(",")
      |> Enum.map(&String.to_integer/1)
      |> Enum.sort()

    Enum.reduce(Enum.at(nums, -1)..Enum.at(nums, 0), :i, fn n, acc ->
      nums
      |> Enum.reduce(0, &(&2 + calculate_distance.(abs(n - &1))))
      |> min(acc)
    end)
    |> round()
  end
end

Utils.run(&Challenge.first_result/1, __ENV__.file, "Q1")
Utils.run(&Challenge.second_result/1, __ENV__.file, "Q2")
