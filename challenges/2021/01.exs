Code.compile_file(Path.join([__ENV__.file], ["../../../utils/utils.exs"]))

defmodule Challenge do
  @moduledoc false

  def first_result(input) do
    input
    |> Enum.reduce([0, nil], fn val, [sum, prev] ->
      val = String.to_integer(val)

      if prev && prev < val, do: [sum + 1, val], else: [sum, val]
    end)
    |> List.first()
  end

  def second_result(input) do
    input
    |> Enum.reduce([0, nil, nil, nil], fn val, [sum, prev3, prev2, prev1] = acc ->
      val = String.to_integer(val)

      if Enum.all?(acc) && prev3 < val do
        [sum + 1, prev2, prev1, val]
      else
        [sum, prev2, prev1, val]
      end
    end)
    |> List.first()
  end
end

Utils.run(&Challenge.first_result/1, __ENV__.file, "Q1")
Utils.run(&Challenge.second_result/1, __ENV__.file, "Q2")
